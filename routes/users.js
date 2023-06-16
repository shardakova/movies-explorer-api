const express = require('express');
const { celebrate } = require('celebrate');
const controller = require('../contollers/users');
const validationSchemas = require('../utils/validationSchemas');

const router = express.Router();

router.get('/me', controller.getUser);
router.patch('/me', celebrate(validationSchemas.updateUser), controller.updateUser);

module.exports = router;
