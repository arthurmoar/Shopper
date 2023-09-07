const conncection = require('./connection');
const camelize = require('camelize');

const findAll = async () => {
  const [allProducts] = await conncection.execute('SELECT * FROM products')
  
  return allProducts;
}

const findById = async (code) => {
  const [[ product ]] = await conncection.execute(
    `SELECT * FROM products WHERE code = ?`,
    [code],
  )
  return camelize(product)
}

module.exports = {
  findAll,
  findById,
};
