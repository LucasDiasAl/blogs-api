const { postService, userService } = require('../services');

const createNewPost = async (req, res) => {
  try {
    const { body, user } = req;
    const { dataValues: { id } } = await userService.getUserByEmail(user);
    const newPost = await postService.createPost(id, body);
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const allPosts = async (_req, res) => {
  try {
    const { posts } = await postService.getAll();
    console.log(posts);
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createNewPost,
  allPosts,
};