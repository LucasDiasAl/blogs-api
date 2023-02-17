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

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  newUser,
  getUsers,
};