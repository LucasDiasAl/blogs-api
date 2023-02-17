const loginValidation = (req, res, next) => {
  const email = req.body.email || false;
  const password = req.body.password || false;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

module.exports = {
  loginValidation,
};