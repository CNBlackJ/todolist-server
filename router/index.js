const router = require('express').Router()
require('./todo')(router)
require('./user')(router)
require('./wxapi')(router)

module.exports = router
