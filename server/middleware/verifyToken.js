const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ msg: 'Access Denied' });

  try {
    const verified = jwt.verify(token, 'jwtSecret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Invalid Token' });
  }
};
