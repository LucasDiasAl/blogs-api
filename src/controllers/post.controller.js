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

module.exports = {
  createNewPost,
};