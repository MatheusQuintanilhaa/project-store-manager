const express = require('express');

const productController = require('../controllers/productController');

const route = express.Router();

route.get('/', productController.getProduct);
route.post('/', productController.createProduct);
route.get('/:id', productController.getProductById);

module.exports = route;
