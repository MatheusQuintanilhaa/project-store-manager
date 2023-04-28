const express = require('express');
const salesFinance = require('../controllers/salesController');

const route = express.Router();

route.get('/', salesFinance.getSales);
route.post('/', salesFinance.addSale);
route.get('/:id', salesFinance.getSalesById);
route.delete('/:id', salesFinance.deleteSale);
route.put('/:id', salesFinance.updateSale);
module.exports = route;
