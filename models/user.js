const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      type: 'format',
      validator: (value) => {
        const validationSchema = Joi.string().email();
        const validationResult = validationSchema.validate(value);
        return !validationResult.error;
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    trim: true,
  },
});

schema.pre('save', function save() {
  const user = this;
  if (user.isModified('password') || this.isNew) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
});

module.exports = mongoose.model('user', schema);
