
const mongoose = require('mongoose')

const { dishesTypes } = require('./constants/enums')
const { Schema } = mongoose

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  },
  description: String,
  type: {
    type: String,
    enum: dishesTypes,
    required: true,
    default: 'food',
    trim: true
  }
})

const model = mongoose.model('Dish', dishSchema)

module.exports = {
  model,
  schema: dishSchema
}
