const joi = require('joi')
joi.objectId = () => joi.string().hex().length(24)
// const ObjectId = require('mongoose').Types.ObjectId

const validator = require('../middleware/validator')
const product = require('../controller').product

module.exports = async(router) => {
  router.get('/api/products', validator({
    query: joi.object().keys({
      limit: joi.number(),
      skip: joi.number(),
      sort: joi.string()
    })
  }), async(req, res) => {
    const resp = await product.list()
    res.jsonp(resp)
  })

  router.get('/api/products/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await product.get(_id)
    res.jsonp(resp)
  })

  router.post('/api/products', validator({
    headers: joi.object().keys({
      'x-user-id': joi.string().required()
    }),
    body: joi.object().keys({
      name: joi.string().required(),
      headImg: joi.string().required(),
      imgs: joi.array().items(joi.string().required()),
      price: joi.number().required(),
      originalPrice: joi.number().required,
      types: joi.array().items(joi.string().required())
    })
  }), async(req, res) => {
    const payload = req.body
    // TODO: get shopId via userId
    const shopId = ''
    payload.shopId = shopId
    const resp = await product.create(payload)
    res.jsonp(resp)
  })

  router.put('/api/products/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    }),
    headers: joi.object().keys({
      'x-user-id': joi.string().required()
    }),
    body: joi.object().keys({
      name: joi.string().required(),
      headImg: joi.string().required(),
      imgs: joi.array().items(joi.string().required()),
      price: joi.number().required(),
      originalPrice: joi.number().required,
      types: joi.array().items(joi.string().required())
    })
  }), async(req, res) => {
    const _id = req.params._id
    const payload = req.body
    const resp = await product.update(_id, payload)
    res.jsonp(resp)
  })

  router.delete('/api/products/:_id', validator({
    params: joi.object().keys({
      _id: joi.objectId().required()
    })
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await product.delete(_id)
    res.jsonp(resp)
  })
}
