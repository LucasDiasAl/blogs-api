const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({
  where: {
    email,
  },
});

const newUser = async (userObj) => {
    await User.create({ ...userObj });
    const result = await User.findOne({ where: { email: userObj.email } });
    return result.dataValues;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users.map((user) => user.dataValues);
};

const getUserById = async (idUser) => {
  const user = await User.findOne({
    where: {
      id: idUser,
    },
    attributes: { exclude: 'password' },
  });
  if (!user) return null;
  return user.dataValues;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return null;
};

module.exports = {
  getUserByEmail,
  newUser,
  getAllUsers,
  getUserById,
  deleteUser,
};