require('dotenv/config');
const jwt = require('jsonwebtoken');

module.exports = (data) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const payload = { data };
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};