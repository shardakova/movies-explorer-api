const Joi = require('joi');
const validateUrl = require('./validateUrl');

function urlValidator(value, helpers) {
  if (!validateUrl(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}

const signIn = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const createUser = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string()
      .required()
      .trim()
      .min(2)
      .max(30),
  }),
};

const updateUser = {
  body: Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string()
      .required()
      .trim()
      .min(2)
      .max(30),
  }),
};

const createMovie = {
  body: Joi.object({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
};

const objectIdParam = {
  params: Joi.object({
    id: Joi.string().required().hex().length(24),
  }),
};

module.exports = {
  signIn,
  createUser,
  updateUser,
  createMovie,
  objectIdParam,
};
