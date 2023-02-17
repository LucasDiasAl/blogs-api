const { userService } = require('../services');

const JwtToken = require('../auth/JwtToken');

const newUser = async (req, res) => {
  try {
    const newUserData = req.body;
    const user = await userService.getUserByEmail(newUserData.email);
    if (user) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const userAdded = await userService.newUser(newUserData);
    const token = JwtToken(userAdded.email);
    res.status(201).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => { 
  try {
    const { user: email } = req;
    const { id: userId } = await userService.getUserByEmail(email);
    const user = await userService.getUserById(userId);
    if (!user) return res.status(401).json({ message: 'User does not exist' });
    await userService.deleteUser(userId);
    return res.status(204).json({});
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  newUser,
  getUsers,
  getUserById,
  deleteUser,
};