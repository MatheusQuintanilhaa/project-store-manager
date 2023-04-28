const connection = require('./connection');

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
  console.log(result);
  return result;
};

const createProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES(?)',
    [name],
  );
  return { id: result.insertId, name };
};

const updateProduct = async (id, name) => {
  const [product] = await getProductById(id);

  if (!product) {
    return { type: 404, message: 'Product not found' };
  }

  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  return { id, name };
};

const deleteProduct = async (id) => {
  const verify = await getProductById(id);

  if (verify.length === 0) return { type: 404, message: 'Product not found' };

  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return { type: null };
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

};
