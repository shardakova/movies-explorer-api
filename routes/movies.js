const express = require('express');
const { celebrate } = require('celebrate');
const controller = require('../contollers/movies');
const validationSchemas = require('../utils/validationSchemas');

const router = express.Router();

router.get('/movies', controller.getMovies);
router.post('/movies', celebrate(validationSchemas.createMovie), controller.createMovie);
router.delete('/movies/:id', celebrate(validationSchemas.objectIdParam), controller.deleteMovie);

module.exports = router;
