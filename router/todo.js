const joi = require('joi')
joi.objectId = () => joi.string().hex().length(24)

const validator = require('../middleware/validator')
const todo = require('../controller').todo

module.exports = async(router) => {
  router.get('/api/todos', validator({
    query: joi.object().keys({
      status: joi.number().allow([1, 2])
    })
  }), async(req, res) => {
    const status = req.query.status || 1
    const resp = await todo.list(status)
    res.jsonp(resp)
  })

  router.get('/api/todos/:_id', validator({
  }), async(req, res) => {
    const _id = req.params._id
    const resp = await todo.get(_id)
    res.jsonp(resp)
  })

  router.post('/api/todos', async(req, res) => {
    const payload = req.body
    const resp = await todo.create(payload)
    res.jsonp(resp)
  })

  router.put('/api/todos/:_id', async(req, res) => {
    const _id = req.params._id
    const payload = req.body
    const resp = await todo.update(_id, payload)
    res.jsonp(resp)
  })

  router.delete('/api/todos/:_id', async(req, res) => {
    const _id = req.params._id
    const resp = await todo.delete(_id)
    res.jsonp(resp)
  })
}
