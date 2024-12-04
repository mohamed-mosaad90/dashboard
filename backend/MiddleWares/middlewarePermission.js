const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied');
    const decodedPayload = jwt.verify(token, 'secretkey');
    if (decodedPayload.role==="Admin") {
      next();
    } else {
      return res.status(403).send('Forbidden');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
