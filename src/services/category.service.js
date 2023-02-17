const { Category } = require('../models');

const newCategory = async (categoryObj) => {
  await Category.create({ ...categoryObj });
  const result = await Category.findOne({ where: { name: categoryObj.name } });
  return result.dataValues;
};

const queryAllCategorys = async () => {
  const result = await Category.findAll();
  return result.map((categ) => categ.dataValues);
};

const queryCategoryById = async (id) => {
  const result = await Category.findOne({ where: { id } });
  if (result) return result.dataValues;
  return null;
};

module.exports = {
  newCategory,
  queryAllCategorys,
  queryCategoryById,
};