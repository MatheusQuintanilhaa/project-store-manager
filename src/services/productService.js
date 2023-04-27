const productModel = require('../models/productModel');
const validations = require('./validations/validation');

const getProduct = async () => {
  const result = await productModel.getProduct();
  return result;
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id);
  return result[0];
};

const createProduct = async (name) => {
  const valid = validations.validateName(name);
  console.log(valid);

  if (valid.type) return valid;

  const result = await productModel.createProduct(name);

  return result;
};

const updateProduct = async (id, name) => {
  const valids = validations.validateName(name);

  if (valids.type) return valids;

  const result = await productModel.updateProduct(id, name);

  return result;
};

const deleteProduct = async (id) => {
  const verify = await productModel.deleteProduct(id);
console.log(verify);
  return verify;
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
