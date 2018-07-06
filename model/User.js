const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const schema = new mongoose.Schema({
  nickName: String,
  gender: Number,
  avatarUrl: String,
  city: String,
  province: String,
  country: String,
  language: String,
  isDeleted: { type: Boolean, default: false }
}, {
  collection: 'User'
})

schema.plugin(timestamps)

module.exports = schema
