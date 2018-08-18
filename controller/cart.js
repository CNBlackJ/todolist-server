const ObjectId = require('mongoose').Types.ObjectId

const db = require('../lib/db')

module.exports = {
  get: async(_id) => {
    return db.Cart.findOne({ _id: ObjectId(_id), isDeleted: false })
  },
  list: async(limit, skip, sort) => {
    return db.Cart.find({ isDeleted: false }).sort(sort).skip(skip).limit(limit)
  },
  create: async (payload) => {
    const resp = await db.Cart.create(payload)
    return resp
  },
  update: async (_id, paylaod) => {
    return db.Cart.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: paylaod },
      { new: true })
  },
  delete: async (_id) => {
    return db.Cart.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: { isDeleted: true } })
  }
}
