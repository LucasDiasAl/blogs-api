const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (userId, postObj) => {
  const { title, content, categoryIds } = postObj;
  const newPost = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryIds
  .map(async (e) => PostCategory.create({ postId: newPost.id, categoryId: e })));
  return newPost.dataValues;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { posts };
};

module.exports = {
  createPost,
  getAll,
 };