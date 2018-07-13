const ObjectId = require('mongoose').Types.ObjectId

const db = require('../lib/db')

module.exports = {
  get: async(_id) => {
    return db.Todo.findOne({ _id: ObjectId(_id), isDeleted: false })
  },
  list: async(status, openId, limit, skip, sort) => {
    const user = await db.User.findOne({ openId })
    return db.Todo.find({ status, userId: user._id, isDeleted: false }).sort(sort).skip(skip).limit(limit)
  },
  create: async (payload) => {
    const resp = await db.Todo.create(payload)
    return resp
  },
  update: async (_id, paylaod) => {
    return db.Todo.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: paylaod },
      { new: true })
  },
  delete: async (_id) => {
    return db.Todo.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: { isDeleted: true } })
  }
}
