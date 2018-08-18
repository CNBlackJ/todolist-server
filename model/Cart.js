const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  count: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false }
}, {
  collection: 'Cart'
})

schema.plugin(timestamps)

module.exports = schema
