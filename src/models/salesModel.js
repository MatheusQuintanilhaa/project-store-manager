const connection = require('./connection');
const productModel = require('./productModel');

const verifyProduct = async (body) => {
  const products = (await productModel.getProduct()).map((cur) => cur.id);
  let initialResult = {};
  body.forEach((cur) => {
    if (!products.includes(cur.productId)) {
      initialResult = { type: 404, message: 'Product not found' };
    }
  });
  return initialResult;
};

// const addSale = async (body) => {
//   const initialResult = await verifyProduct(body);

//   if (initialResult.type) return initialResult;

//   const [result] = await connection.execute(
//     'INSERT INTO StoreManager.sales(date) VALUES (now())',
//   );

//   body.forEach(async (cur) => {
//     await connection.execute(
//       'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
//       [result.insertId, cur.productId, cur.quantity],
//     );
//   });
//   console.log(result);

//   return result.insertId;
// };

const addSale = async (body) => {
  const initialResult = await verifyProduct(body);

  if (initialResult.type) return initialResult;

  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (now())',
  );

  const promises = body.map((cur) => connection.execute(
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [result.insertId, cur.productId, cur.quantity],
    ));

  await Promise.all(promises);

  return result.insertId;
};

const getSales = async () => {
  const [result] = await connection.execute(`
    SELECT sale_id, date, product_id, quantity FROM StoreManager.sales_products AS sa_pro
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sa_pro.sale_id ORDER BY id ASC`);

  return result;
};

const getSalesById = async (id) => {
  const result = await connection.execute(`
    SELECT date, product_id, quantity FROM StoreManager.sales_products AS sa_pro
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sa_pro.sale_id
    WHERE sale_id = ?;`,
    [id]);

  return result;
};

module.exports = {
  addSale,
  getSales,
  getSalesById,
};