
const get = require('lodash/get')

const order = require('../../usecases/order')
const utils = require('../../lib/utils/index')

const orderFields = [
  'name',
  'dishes'
]

module.exports = router => {
  router.get('/orders', async ctx => {
    const allOrders = await order.getAll()

    return ctx.resolve({ payload: { orders: allOrders } })
  })

  router.post('/orders', async ctx => {
    const requestData = get(ctx, 'request.body', {})
    const newOrderData = utils.removeExtraData(requestData, orderFields)
    const newOrder = await order.create(newOrderData)

    return ctx.resolve({ payload: { order: newOrder } })
  })

  router.patch('/order/:orderId/dish/:dishId', async ctx => {
    const { orderId, dishId } = get(ctx, 'params', {})
    const successMessage = `Dish added to order ${orderId}`

    const orderUpdated = await order.addDish(orderId, dishId)
    return ctx.resolve({ payload: { order: orderUpdated }, message: successMessage })
  })

  router.del('/order/:orderId/dish/:dishId', async ctx => {
    const { orderId, dishId } = get(ctx, 'params', {})
    const successMessage = `Dish removed from order ${orderId}`

    const orderUpdated = await order.deleteOneDishById(orderId, dishId)
    return ctx.resolve({ payload: { order: orderUpdated }, message: successMessage })
  })
}
