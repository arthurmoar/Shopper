const { productsModel } = require('../model')

const findAll = async () => {
  const allProducts = await productsModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
};

const findById = async (code) => {
  const product = await productsModel.findById(code);

  if (product) return { status: 'SUCCESSFUL', message: product };
  return { status: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
}