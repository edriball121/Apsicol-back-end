//llamar a jwt
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json('No autorizado');
  const token = req.headers.authorization.substr(7);
  if (token !== '') {
    const content = jwt.verify(token, 'admin');
    req.data = content;
    next();
  } else {
    res.status(401).json('Token vacio');
  }
  console.log(token);
}

module.exports = verifyToken;
