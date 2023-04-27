const productService = require('../services/productService');

const getProduct = async (req, res) => {
  const result = await productService.getProduct();
  res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const result = await productService.getProductById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const result = await productService.createProduct(name);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await productService.updateProduct(id, name);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(200).json(result);
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
};
