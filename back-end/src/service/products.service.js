const { productsModel } = require('../model')

const findAll = async () => {
  const allProducts = await productsModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
};

const findById = async (code) => {
  const product = await productsModel.findById(code);

  if (product) return { status: 'SUCCESSFUL', data: product };
  return { status: 'NOT_FOUND', data: 'Product not found!' };
};

const update = async (salesPrice, code) => {
  const success = await productsModel.update(code, salesPrice);

  if (success) {
    return { status: 'SUCCESSFUL', data: success };
  } else {
    return { status: 'NOT_FOUND', data: `Produto com o código ${code} não encontrado` };
  }
}

module.exports = {
  findAll,
  findById,
  update,
}