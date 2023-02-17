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
    const posts = await postService.getAll();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(Number(id));
    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateById = async (req, res) => { 
  try {
    const { body, user, params: { id } } = req;
    const { dataValues: { id: userId } } = await userService.getUserByEmail(user);
    const { type, message } = await postService.updatePost(userId, body, id);
    if (type !== 'sucess') return res.status(401).json({ message });
    return res.status(200).json(message);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deletePostById = async (req, res) => { 
  try {
    const { id } = req.params;
    const { dataValues: { id: userId } } = await userService.getUserByEmail(req.user);
    const { type, message } = await postService.queryDeleteById(userId, id);
    console.log(type, message);
    if (type !== 'sucess') return res.status(type).json({ message });
    return res.status(204).json();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  deletePostById,
  createNewPost,
  allPosts,
  getPostById,
  updateById,
};