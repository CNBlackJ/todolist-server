const joi = require('joi')
joi.objectId = () => joi.string().hex().length(24)
// const ObjectId = require('mongoose').Types.ObjectId

const validator = require('../middleware/validator')
const cart = require('../controller').cart

module.exports = async(router) => {
  router.get('/api/carts', validator({
    query: joi.object().keys({
      limit: joi.number(),
      skip: joi.number(),
      sort: joi.string()
    })
  }), async(req, res) => {
    const resp = await cart.list()
    res.jsonp(resp)
  })

  router.get('/api/carts/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await cart.get(_id)
    res.jsonp(resp)
  })

  router.post('/api/carts', validator({
    headers: joi.object().keys({
      'x-user-id': joi.string().required()
    }),
    body: joi.object().keys({
      productId: joi.objectId().required()
    })
  }), async(req, res) => {
    const payload = req.body
    const userId = req.headers['x-user-id']
    payload.userId = userId
    const resp = await cart.create(payload)
    res.jsonp(resp)
  })

  router.put('/api/carts/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    }),
    headers: joi.object().keys({
      'x-user-id': joi.string().required()
    }),
    body: joi.object().keys({
      count: joi.nunber().valid(1, -1)
    })
  }), async(req, res) => {
    const _id = req.params._id
    const payload = req.body
    const resp = await cart.update(_id, payload)
    res.jsonp(resp)
  })

  router.delete('/api/carts/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await cart.delete(_id)
    res.jsonp(resp)
  })
}
