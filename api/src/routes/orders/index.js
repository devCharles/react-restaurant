
const get = require('lodash/get')

const Order = require('../../models/order').model
const utils = require('../../lib/utils/index')

const orderFields = [
  'dishes'
]

module.exports = router => {
  router.get('/orders', async ctx => {
    const data = await Order.find({}).exec()
    return ctx.resolve({ payload: { order: data } })
  })

  router.post('/orders', async ctx => {
    const requestData = get(ctx, 'request.body', {})
    const newOrderData = utils.removeExtraData(requestData, orderFields)
    const newOrder = new Order(newOrderData)

    const error = newOrder.validateSync()
    if (error) throw ctx.throw(400, error.message)

    const orderCreated = await newOrder.save()

    return ctx.resolve({ payload: { order: orderCreated } })
  })
}
