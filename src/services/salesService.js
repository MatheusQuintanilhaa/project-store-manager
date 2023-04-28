const salesModel = require('../models/salesModel');
const validation = require('./validations/validation');
const productService = require('./productService');

const addSale = async (body) => {
  const error = validation.validateSales(body);
  if (error.type) return error;

  const result = await salesModel.addSale(body);
  if (result.type) return result;

  return { id: result, itemsSold: body };
};

const getSales = async () => {
  const result = await salesModel.getSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);

  return result[0];
};

const deleteSale = async (id) => {
  const verify = await salesModel.deleteSale(id);

  return verify;
};

const updateSale = async (id, body) => {
  const error = validation.validateSales(body);
  const getSalesTest = await getSalesById(id);
  if (error.type) return error;
  if (!getSalesTest || (getSalesTest.length === 0)) {
    return { type: 404, message: 'Sale not found' };
  }
  const products = await productService.getProduct();
  const test = body.every((e) => products.some((p) => p.id === e.productId));
  if (!test) return { type: 404, message: 'Product not found' };

  await salesModel.updateSale(id, body);

  return { type: null };
};

module.exports = {
  addSale,
  getSales,
  getSalesById,
  deleteSale,
  updateSale,
};
