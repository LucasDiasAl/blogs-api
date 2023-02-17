// const Sequelize = require('sequelize');
// require('dotenv').config();
// const config = require('../config/config');

// const env = process.env.NODE_ENV || 'development';

// const sequelize = new Sequelize(config[env]);

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

module.exports = {
  getUserByEmail,
  newUser,
};