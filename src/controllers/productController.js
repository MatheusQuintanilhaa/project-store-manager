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

  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await productService.updateProduct(id, name);

  if (result.type) return res.status(result.type).json({ message: result.message });

  return res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const verify = await productService.deleteProduct(id);

  if (verify.type) return res.status(verify.type).json({ message: verify.message });

  return res.status(204).send();
};

const lastEndPointController = async (req, res) => {
  const { q } = req.query;
  const products = await productService.lastEndPointService(q);
  console.log(products, 'p');
  if (products.length === 0) {
    return res.status(404).json({ message: 'product not found' });
  }
  return res.status(200).json(products);
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  lastEndPointController,
};
