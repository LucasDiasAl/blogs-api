const { categoryService } = require('../services');

const categoryIdsExists = async (ids) => {
  const result = await Promise.all(ids.map(async (e) => categoryService.queryCategoryById(e)));
  console.log(result);
  if (result.some((e) => e === null) || result.length === 0) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
  return { type: null };
};

const postInputsExists = (body) => {
  const { title, content, categoryIds } = body;
  console.log(body);
  if (!title || !content || !categoryIds) {
    return { type: 400, message: 'Some required fields are missing' };
  }
  return { type: null };
};

const allPostInputsValidations = async (req, res, next) => {
  const inputExists = postInputsExists(req.body);
  if (inputExists.type) return res.status(inputExists.type).json({ message: inputExists.message });
  const result = await categoryIdsExists(req.body.categoryIds);
  if (result.type) return res.status(result.type).json({ message: result.message });
  next();
};

module.exports = allPostInputsValidations;