const express = require('express');
const { celebrate } = require('celebrate');
const controller = require('../contollers/movies');
const validationSchemas = require('../utils/validationSchemas');

const router = express.Router();

router.get('/', controller.getMovies);
router.post('/', celebrate(validationSchemas.createMovie), controller.createMovie);
router.delete('/:id', celebrate(validationSchemas.objectIdParam), controller.deleteMovie);

module.exports = router;
