function auth (req, res, next) {
  const { authorization } = req.headers
  const token = 'vinliToken'
  if (authorization !== token) {
    res.jsonp({
      code: 401,
      msg: 'Invalid token.'
    })
  } else {
    next()
  }
}

module.exports = auth
