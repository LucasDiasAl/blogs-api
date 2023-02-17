const { userService } = require('../services');

const JwtToken = require('../auth/JwtToken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = JwtToken(email);
    res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  loginUser,
};
