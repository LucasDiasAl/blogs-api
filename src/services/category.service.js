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

module.exports = {
  newCategory,
  queryAllCategorys,
};