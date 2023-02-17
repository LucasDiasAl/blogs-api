const { categoryService } = require('../services');

const createCategory = async (req, res) => {
 try {
 const { name } = req.body;
 if (!name) return res.status(400).json({ message: '"name" is required' });
  const result = await categoryService.newCategory({ name });
  res.status(201).json(result);
 } catch (err) {
  res.status(400).json({ error: err.message });
 }
};

const getAllCategorys = async (_req, res) => {
try {
  const allCateg = await categoryService.queryAllCategorys();
  res.status(200).json(allCateg); 
} catch (err) {
  res.status(400).json({ error: err.message }); 
}
};

module.exports = {
  createCategory,
  getAllCategorys,
};
