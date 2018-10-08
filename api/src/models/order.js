
const mongoose = require('mongoose')
const { Schema } = mongoose
const { schema: tableSchema } = require('./table')

const orderSchema = new Schema({
  tableId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  dishes: [tableSchema],
  description: String
})

module.exports = {
  model: mongoose.model('Order', orderSchema),
  schema: orderSchema
}
