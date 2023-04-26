const productModel = require('../models/productModel');

const getProduct = async () => {
  const result = await productModel.getProduct();
  return result;
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id);
  return result[0];
};
module.exports = {
  getProduct,
  getProductById,
};
