function APIOutputMiddleware (req, res, next) {
  res.apiSuccess = (data, exData = {}) => {
    res.jsonp(Object.assign({
      status: 'OK',
      code: 200,
      data: data,
      server_time: Date.parse(new Date())
    }, exData))
  }
  res.apiError = (err) => {
    res.jsonp({
      status: 'Error',
      error_code: parseInt(err.code) || parseInt(err.error_code) || 500,
      error_msg: err.message || err.error_msg || err.toString() || 'Unknown Error',
      server_time: Date.parse(new Date())
    })
  }
  next()
}

module.exports = APIOutputMiddleware
