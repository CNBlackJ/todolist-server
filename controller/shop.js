const ObjectId = require('mongoose').Types.ObjectId

const db = require('../lib/db')

module.exports = {
  get: async(_id) => {
    return db.Shop.findOne({ _id: ObjectId(_id), isDeleted: false })
  },
  list: async(limit, skip, sort) => {
    return db.Shop.find({ isDeleted: false }).sort(sort).skip(skip).limit(limit)
  },
  create: async (payload) => {
    const resp = await db.Shop.create(payload)
    return resp
  },
  update: async (_id, paylaod) => {
    return db.Shop.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: paylaod },
      { new: true })
  },
  delete: async (_id) => {
    return db.Shop.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: { isDeleted: true } })
  }
}
