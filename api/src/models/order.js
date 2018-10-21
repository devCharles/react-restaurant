
const mongoose = require('mongoose')
const { Schema } = mongoose
const { schema: dishSchema } = require('./dish')

const orderSchema = new Schema({
  dishes: {
    type: [dishSchema],
    required: true
  }
})

module.exports = {
  model: mongoose.model('Order', orderSchema),
  schema: orderSchema
}
