const merge = require('lodash/merge')

const env = process.env.TEST !== 'true'

function filterBody (body) {
  let newBody = typeof body === 'string' ? JSON.parse(body) : body
  let bodyToCleaner = merge({}, newBody)
  if ('password' in bodyToCleaner) bodyToCleaner.password = '<password>'
  if ('token' in bodyToCleaner) bodyToCleaner.token = '<token>'
  return typeof body === 'string' ? body : JSON.stringify(bodyToCleaner)
}

module.exports = async (ctx, next) => {
  try {
    let start = Date.now()
    await next()
    const ms = Date.now() - start
    env && console.log(`${ctx.method} ${ctx.url} -> ${ctx.status} - ${ms}ms, query: ${JSON.stringify(ctx.query)}, ${(ctx.method !== 'GET' || ctx.method !== 'DELETE') && `body: ${filterBody(ctx.request.body)},`} at ${(new Date()).toISOString()}`)
  } catch (error) {
    console.log(`${ctx.method} ${ctx.url} -> ${ctx.status}, query: ${JSON.stringify(ctx.query)}, body: ${filterBody(ctx.request.body)}, at ${(new Date()).toISOString()}`)
    console.error(error)
    throw error
  }
}
