const connection = require('./connection');
const camelize = require('camelize');
const snakeize = require('snakeize');

const findAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM shopperdb.products')
  
  return allProducts;
}

const findById = async (code) => {
  const [[ product ]] = await connection.execute(
    `SELECT * FROM shopperdb.products WHERE code = ?`,
    [code],
  )
  return camelize(product)
}

const update = async (code, salesPrice) => {
  try {
    const updatedProducts = await connection.execute(
      `UPDATE shopperdb.products SET sales_price = ? WHERE code = ?`,
      [code, salesPrice],
    );

    console.log('Consulta SQL executada com sucesso. Linhas afetadas:', updatedProducts.affectedRows);

    return camelize(updatedProducts);
  } catch (error) {
    console.error('Erro ao executar consulta SQL:', error);
    throw error; // Lança o erro novamente para que ele possa ser tratado no serviço ou controlador
  }
};


module.exports = {
  findAll,
  findById,
  update,
};
