const express = require('express');

const productController = require('../controllers/productController');

const route = express.Router();

route.get('/search', productController.lastEndPointController);
route.get('/', productController.getProduct);
route.post('/', productController.createProduct);
route.get('/:id', productController.getProductById);
route.put('/:id', productController.updateProduct);
route.delete('/:id', productController.deleteProduct);
module.exports = route;
