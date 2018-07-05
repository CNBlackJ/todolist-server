const errors = {
  '403': 'Access denied',
  '404': 'Not Found'
}

function Exception (code, extra, err) {
  this.error_code = code
  this.error_msg = errors[ code.toString() ] || err || extra || '未知错误'
  this.external = true
  if (extra) this.error_extra = extra
  this.stack = (new Error()).stack
}

module.exports = Exception
