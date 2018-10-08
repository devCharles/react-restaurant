const mongoose = require('mongoose')

const DB_USER = process.env.DB_USER || ''
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || 'leco-restaurant'
const CONN_STRING = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@charles-mongo-cluster-shard-00-00-ekbll.mongodb.net:27017,charles-mongo-cluster-shard-00-01-ekbll.mongodb.net:27017,charles-mongo-cluster-shard-00-02-ekbll.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=charles-mongo-cluster-shard-0&authSource=admin&retryWrites=true`

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(CONN_STRING, { keepAlive: true, keepAliveInitialDelay: 300000 })
  const db = mongoose.connection

  db.on('error', error => {
    console.error('[DB ERROR]: ')
    return reject(error)
  })
  db.once('open', () => {
    return resolve(mongoose)
  })
})

module.exports = { connect }
