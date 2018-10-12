
const mongoose = require('mongoose')
const { Schema } = mongoose

const tableSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  custommersNumber: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  },
  isTaken: {
    type: Boolean,
    required: true,
    default: false
  }
})

const model = mongoose.model('Table', tableSchema)

module.exports = {
  model,
  schema: tableSchema
}
