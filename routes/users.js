const express = require('express');
const { celebrate } = require('celebrate');
const controller = require('../contollers/users');
const validationSchemas = require('../utils/validationSchemas');

const router = express.Router();

router.get('/users/me', controller.getUser);
router.patch('/users/me', celebrate(validationSchemas.updateUser), controller.updateUser);

module.exports = router;
