const jwt = require('jsonwebtoken')

const secretWord = process.env.JWT_KEY || 'superSecretWord'
const ttl = process.env.JWT_LIFE_TIME || '12h'

module.exports = {
  create (payload, secret = secretWord) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn: ttl }, function (error, token) {
        if (error) return reject(error)
        resolve(token)
      })
    })
  },

  verify (token, secret = secretWord) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, function (error, decoded) {
        if (error) return reject(error)
        resolve(decoded)
      })
    })
  }
}
