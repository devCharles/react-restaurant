
const mongoose = require('mongoose')
const { Schema } = mongoose
const { schema: tableSchema } = require('./table')

const orderSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    index: true,
    unique: true,
    required: true
  },
  tableId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  dishes: [tableSchema],
  description: String
})

module.exports = {
  model: mongoose.model('Dish', orderSchema),
  schema: orderSchema
}
