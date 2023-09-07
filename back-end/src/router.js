const express = require('express');

const router = express.Router();

const { productsController } = require('./controller');

router.get('/', productsController.findAll);
router.get('/:code', productsController.findById);

module.exports = router