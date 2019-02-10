const jwt = require('jsonwebtoken');

function isAdmin (req, res, next) {

  if (!req.user.isAdmin) return res.status(403).send('Access Denied');

  next()

}

module.exports = isAdmin;