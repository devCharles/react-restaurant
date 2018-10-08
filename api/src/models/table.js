
const mongoose = require('mongoose')
const { Schema } = mongoose

const tableSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    index: true,
    unique: true,
    required: true
  },
  name: String,
  capacity: Number,
  isTaken: Boolean
})

module.exports = {
  model: mongoose.model('Mesa', tableSchema),
  schema: tableSchema
}
