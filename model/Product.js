const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const schema = new mongoose.Schema({
  name: String,
  headImg: String,
  imgs: [ String ],
  price: Number,
  originalPrice: Number,
  types: [ String ],
  sales: Number,
  descriptions: {
    content: String,
    imgs: [ String ]
  },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  isDeleted: { type: Boolean, default: false }
}, {
  collection: 'Product'
})

schema.plugin(timestamps)

module.exports = schema
