const { productsService } = require('../service');

const findAll = async (_req, res) => {
  const allProducts = await productsService.findAll();

  res.status(200).json(allProducts);
};

const findById = async (req, res) => {
  const { product_code } = req.params;
  const code = product_code;
  
  const product = await productsService.findById(Number(code));

  if (product.status === 'NOT_FOUND') return res.status(404).json({ product });

  res.status(200).json({ product });
}

const update = async (req, res) => {
  const item = req.body;

  const { product_code, new_price } = item;
  const code = product_code;
  const salesPrice = new_price

  const productUpdate = await productsService.update(code, salesPrice);

  if (productUpdate.status === 'NOT_FOUND') {
    return res.status(404).json(productUpdate);
  }
  res.status(204).json(productUpdate);
}

module.exports = {
  findAll,
  findById,
  update,
}