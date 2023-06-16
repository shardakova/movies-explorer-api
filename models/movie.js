const mongoose = require('mongoose');
const validateUrl = require('../utils/validateUrl');

const schema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    trim: true,
  },
  nameEN: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('movie', schema);
