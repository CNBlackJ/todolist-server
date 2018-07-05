const ObjectId = require('mongoose').Types.ObjectId

const db = require('../lib/db')

module.exports = {
  get: async(_id) => {
    return db.Todo.findOne({ _id: ObjectId(_id), isDeleted: false })
  },
  list: async(status, limit, skip, sort) => {
    return db.Todo.find({ status, isDeleted: false }).sort(sort).skip(skip).limit(limit)
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
