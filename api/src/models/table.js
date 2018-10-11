
const mongoose = require('mongoose')
const { Schema } = mongoose

const tableSchema = new Schema({
  name: String,
  custommersNumber: Number,
  isTaken: Boolean
})

const model = mongoose.model('Table', tableSchema)

module.exports = {
  model,
  schema: tableSchema
}
