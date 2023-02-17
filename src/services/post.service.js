const { BlogPost, PostCategory } = require('../models');

const createPost = async (userId, postObj) => {
  const { title, content, categoryIds } = postObj;
  const newPost = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryIds
  .map(async (e) => PostCategory.create({ postId: newPost.id, categoryId: e })));
  return newPost.dataValues;
};

module.exports = {
  createPost,
 };