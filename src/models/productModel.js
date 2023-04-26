const connection = require('./connection');
// const validations = require('../services/validations/validation');

const getProduct = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

module.exports = {
  getProduct,
  getProductById,
};
