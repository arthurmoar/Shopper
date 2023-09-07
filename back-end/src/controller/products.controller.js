const { productsService } = require('../service');

const findAll = async (_req, res) => {
  const allProducts = await productsService.findAll();

  res.status(200).json(allProducts);
};

const findById = async (req, res) => {
  const { code } = req.params;
  
  const product = await productsService.findById(Number(code));

  if (product.status) return res.status(404).json({ product });

  res.status(200).json(product);
}

module.exports = {
  findAll,
  findById,
}