const mongoose = require('mongoose');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors');
const Movie = require('../models/movie');

const defaultFields = {
  country: 1,
  director: 1,
  duration: 1,
  year: 1,
  description: 1,
  image: 1,
  trailerLink: 1,
  thumbnail: 1,
  movieId: 1,
  nameRU: 1,
  nameEN: 1,
};

async function getMovies(req, res, next) {
  try {
    const movies = await Movie.find({ owner: req.user._id }, defaultFields);
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
}

async function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    res.status(201);
    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }
    return next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError());
    }
    const movie = await Movie.findById(id);
    if (!movie) {
      return next(new NotFoundError());
    }
    if (movie.owner.toString() !== req.user._id) {
      return next(new ForbiddenError());
    }
    await movie.deleteOne();
    return res.send({ message: 'Фильм успешно удален.' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
