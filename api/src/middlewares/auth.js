
const jwt = require('../lib/jwt')

module.exports = (authRoles = []) => async (ctx, next) => {
  if ('authorization' in ctx.request.headers) {
    try {
      let jwtDecoded = await jwt.verify(ctx.request.headers.authorization)
      if (jwtDecoded) return next()
      ctx.throw(401, 'Unauthorized')
    } catch (error) {
      console.error(error)
      ctx.throw(401, 'Invalid token')
    }
  } else {
    ctx.throw(401, 'Unauthorized')
  }
}
