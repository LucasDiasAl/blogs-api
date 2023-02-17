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
  return posts;
};

const getPostById = async (id) => {
  const posts = await BlogPost.findByPk(id, {
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
  return posts;
};

const updatePost = async (userId, body, id) => {
  const targetPost = await getPostById(id);
  if (targetPost.user.id !== userId) return { type: 'fail', message: 'Unauthorized user' };
  const { title, content } = body;
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const updatedPost = await getPostById(id);
  return { type: 'sucess', message: updatedPost };
};

const queryDeleteById = async (userId, id) => {
  const targetPost = await getPostById(id);
  if (!targetPost) return { type: 404, message: 'Post does not exist' };
  if (targetPost.user.id !== userId) return { type: 401, message: 'Unauthorized user' };
  await BlogPost.destroy({
    where: {
      id,
    },
  });
  return { type: 'sucess', message: '' };
};

module.exports = {
  createPost,
  getAll,
  getPostById,
  updatePost,
  queryDeleteById,
 };