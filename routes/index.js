const express = require('express');
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const validationSchemas = require('../utils/validationSchemas');
const usersController = require('../contollers/users');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();

router.post('/signin', celebrate(validationSchemas.signIn), usersController.signIn);
router.post('/signup', celebrate(validationSchemas.createUser), usersController.createUser);
router.post('/signout', usersController.signOut);

router.use('/', auth, users);
router.use('/', auth, movies);

router.use((req, res, next) => next(new NotFoundError()));

module.exports = router;
