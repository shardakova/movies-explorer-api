const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} = require('../utils/errors');

const defaultFields = {
  email: 1,
  name: 1,
};

async function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;
  try {
    const user = new User({
      email,
      password,
      name,
    });
    await user.validate();
    await user.save();
    return res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return next(new ConflictError());
    }
    return next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new BadRequestError());
    }
    const user = await User.findById(userId, defaultFields);
    if (!user) {
      return next(new NotFoundError());
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { name, email } = req.body;
    const id = req.user._id;
    const user = await User.findOneAndUpdate({
      _id: id,
    }, {
      name,
      email,
    }, {
      fields: defaultFields,
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError());
    }
    return res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }
    return next(err);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    }, {
      password: 1,
    });
    if (!user) {
      return next(new UnauthorizedError());
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(new UnauthorizedError());
    }
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('token', token, { httpOnly: true });
    return res.send({});
  } catch (err) {
    return next(err);
  }
}

async function signOut(req, res) {
  res.cookie('token', '', { httpOnly: true, maxAge: 0 });
  return res.send({});
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  signIn,
  signOut,
};
