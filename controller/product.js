const ObjectId = require('mongoose').Types.ObjectId

const db = require('../lib/db')

module.exports = {
  get: async(_id) => {
    return db.Product.findOne({ _id: ObjectId(_id), isDeleted: false })
  },
  list: async(limit, skip, sort) => {
    return db.Product.find({ isDeleted: false }).sort(sort).skip(skip).limit(limit)
  },
  create: async (payload) => {
    const resp = await db.Product.create(payload)
    return resp
  },
  update: async (_id, paylaod) => {
    return db.Product.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: paylaod },
      { new: true })
  },
  delete: async (_id) => {
    return db.Product.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: { isDeleted: true } })
  }
}
