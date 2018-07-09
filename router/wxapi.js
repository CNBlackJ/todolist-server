const joi = require('joi')
const axios = require('axios')
joi.objectId = () => joi.string().hex().length(24)

const validator = require('../middleware/validator')
const config = require('../config')

module.exports = async(router) => {
  router.post('/api/token', validator({
    body: joi.object().keys({
      code: joi.string().required()
    })
  }), async(req, res) => {
    const uri = 'https://api.weixin.qq.com/sns/jscode2session'
    const APPID = config.APPID
    const APPSECRET = config.APPSECRET
    const JSCODE = req.body.code
    const GRANT_TYPE = 'authorization_code'
    const url = `${uri}?appid=${APPID}&secret=${APPSECRET}&js_code=${JSCODE}&grant_type=${GRANT_TYPE}`
    const resp = await axios.get(url)
    if (resp.data && !resp.data.errcode) res.jsonp(resp.data)
  })
}
