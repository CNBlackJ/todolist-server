const joi = require('joi')
joi.objectId = () => joi.string().hex().length(24)
// const ObjectId = require('mongoose').Types.ObjectId

const validator = require('../middleware/validator')
const shop = require('../controller').shop

module.exports = async(router) => {
  router.get('/api/shops', validator({
    query: joi.object().keys({
      limit: joi.number(),
      skip: joi.number(),
      sort: joi.string()
    })
  }), async(req, res) => {
    const resp = await shop.list()
    res.jsonp(resp)
  })

  router.get('/api/shops/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await shop.get(_id)
    res.jsonp(resp)
  })

  router.post('/api/shops', validator({
    headers: joi.object().keys({
      'x-user-id': joi.string().required()
    }),
    body: joi.object().keys({
      name: joi.string().required(),
      img: joi.string().required(),
      address: joi.string().required()
    })
  }), async(req, res) => {
    const payload = req.body
    const userId = req.headers['x-user-id']
    payload.userId = userId
    const resp = await shop.create(payload)
    res.jsonp(resp)
  })

  router.put('/api/shops/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    }),
    headers: joi.object().keys({
      'x-user-id': joi.string().required()
    }),
    body: joi.object().keys({
      name: joi.string().required(),
      img: joi.string().required(),
      address: joi.string().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const payload = req.body
    const resp = await shop.update(_id, payload)
    res.jsonp(resp)
  })

  router.delete('/api/shops/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await shop.delete(_id)
    res.jsonp(resp)
  })
}
