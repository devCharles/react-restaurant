
const mongoose = require('mongoose')

const { dishesTypes } = require('./constants/enums')
const { Schema } = mongoose

const dishSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    index: true,
    unique: true,
    required: true
  },
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

module.exports = {
  model: mongoose.model('Dish', dishSchema),
  schema: dishSchema
}
