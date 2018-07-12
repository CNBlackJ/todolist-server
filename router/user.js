const joi = require('joi')
joi.objectId = () => joi.string().hex().length(24)

const validator = require('../middleware/validator')
const user = require('../controller').user

module.exports = async(router) => {
  router.get('/api/users', validator({
    query: joi.object().keys({
      openId: joi.string()
    })
  }), async(req, res) => {
    const openId = req.query.openId
    const condition = {
      openId
    }
    const resp = await user.list(condition)
    res.jsonp(resp)
  })

  router.get('/api/users/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await user.get(_id)
    res.jsonp(resp)
  })

  router.post('/api/users', validator({
    body: joi.object().keys({
      openId: joi.string().required(),
      nickName: joi.string(),
      gender: joi.number(),
      avatarUrl: joi.string(),
      city: joi.string().allow(''),
      province: joi.string().allow(''),
      country: joi.string().allow(''),
      language: joi.string().allow('')
    })
  }), async(req, res) => {
    const payload = req.body
    const resp = await user.create(payload)
    res.jsonp(resp)
  })

  router.put('/api/users/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    }),
    body: joi.object().keys({
      nickName: joi.string(),
      gender: joi.number(),
      avatarUrl: joi.string(),
      city: joi.string(),
      province: joi.string(),
      country: joi.string(),
      language: joi.string()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const payload = req.body
    const resp = await user.update(_id, payload)
    res.jsonp(resp)
  })

  router.delete('/api/users/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await user.delete(_id)
    res.jsonp(resp)
  })
}
