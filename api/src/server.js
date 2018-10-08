const Koa = require('koa')
const cors = require('kcors')
const Router = require('koa-router')
const koaBody = require('koa-body')

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const resolver = require('./middlewares/ctx/resolver')

const app = new Koa()
const router = new Router()
const environment = process.env.NODE_ENV || 'development'

router.get('/', async (ctx, next) => {
  ctx.body = '- REACT RESTAURANT API -'
})

require('./routes/orders')(router)
require('./routes/dishes')(router)
require('./routes/tables')(router)

if (environment === 'production') {
  console.log('Initializing helmet...')
  const helmet = require('koa-helmet')
  app.use(helmet())
}

app.use(cors())
app.use(koaBody({ multipart: true, formidable: { maxFileSize: 10000000 } }))
app.use(errorHandler)
app.use(resolver)
app.use(logger)
app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error(`[ERROR] in (${ctx.path}): `, err)
})

module.exports = app
