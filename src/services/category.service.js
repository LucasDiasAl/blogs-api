const { Category } = require('../models');

const newCategory = async (categoryObj) => {
  await Category.create({ ...categoryObj });
  const result = await Category.findOne({ where: { name: categoryObj.name } });
  return result.dataValues;
};

module.exports = {
  newCategory,
};