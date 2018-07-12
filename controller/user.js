const ObjectId = require('mongoose').Types.ObjectId

const db = require('../lib/db')

module.exports = {
  get: async(_id) => {
    return db.User.findOne({ _id: ObjectId(_id), isDeleted: false })
  },
  list: async(con, limit, skip, sort) => {
    const condition = { isDeleted: false }
    Object.assign(condition, con)
    return db.User.find(condition).sort(sort).skip(skip).limit(limit)
  },
  create: async (payload) => {
    let user = await db.User.findOne({ openId: payload.openId })
    if (!user) {
      user = await db.User.create(payload)
    }
    return user
  },
  update: async (_id, paylaod) => {
    return db.User.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: paylaod },
      { new: true })
  },
  delete: async (_id) => {
    return db.User.findOneAndUpdate(
      { _id: ObjectId(_id), isDeleted: false },
      { $set: { isDeleted: true } })
  }
}
