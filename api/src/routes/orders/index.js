
const get = require('lodash/get')

const Order = require('../../models/order').model
const utils = require('../../lib/utils/index')

const orderFields = [
  'tableId',
  'dishes',
  'description'
]

module.exports = router => {
  router.get('/order', async ctx => {
    const data = await Order.find({}).exec()
    ctx.resolve({ payload: { order: data } })
  })

  router.post('/order', async ctx => {
    console.warn('body: ', ctx.request.body)
    const requestData = get(ctx, 'request.body', {})
    const newOrderData = utils.removeExtraData(requestData, orderFields)
    const newOrder = new Order(newOrderData)

    const error = newOrder.validateSync()
    if (error) throw ctx.throw(400, error.message)

    const orderCreated = await newOrder.save()

    console.warn('dish created: ', orderCreated)
    ctx.resolve({ payload: { order: orderCreated } })
  })
}
