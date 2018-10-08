
module.exports = async (ctx, next) => {
  ctx.resolve = ({status = 200, message = 'DONE!', payload = {}, extra = {}} = {}) => {
    ctx.body = {
      success: true,
      message,
      payload,
      ...extra
    }
  }
  return next()
}
