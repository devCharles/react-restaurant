require('dotenv').config()
const db = require('./src/lib/db')

const server = require('./src/server')
const port = process.env.PORT || 8081
server.listen(port, function () {
  console.log(`Server run: http://localhost:${port}`)
  db.connect()
    .then(() => console.warn('< MONGO CONNECTED >'))
    .catch(error => console.error('ERROR CONN: ', error))
})
