const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const schema = new mongoose.Schema({
  name: String,
  sex: Number,
  avatar: String,
  isDeleted: { type: Boolean, default: false }
}, {
  collection: 'User'
})

schema.plugin(timestamps)

module.exports = schema
