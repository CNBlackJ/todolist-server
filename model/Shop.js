const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const schema = new mongoose.Schema({
  name: String,
  img: String,
  address: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false }
}, {
  collection: 'Shop'
})

schema.plugin(timestamps)

module.exports = schema
