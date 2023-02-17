const Jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization || null;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Expired or invalid token' });
    req.user = decoded.email;
  });
next();
};