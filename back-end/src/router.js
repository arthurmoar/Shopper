const express = require('express');

const router = express.Router();

const { productsController } = require('./controller');

router.get('/', productsController.findAll);
router.get('/:product_code', productsController.findById);
router.patch('/:code', productsController.update);


module.exports = router