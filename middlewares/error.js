function error(err, req, res, next) {
  // log the err
  res.status(500).send('Something went wrong')
}

module.exports = error;