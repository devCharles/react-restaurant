
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || 500
    ctx.body = {
      success: false,
      message: error.message
    }
    ctx.app.emit('error', error, ctx)
  }
}
