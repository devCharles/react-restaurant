
const Order = require('../models/order').model

const dish = require('./dish')

async function getAll () {
  return Order.find({}).exec()
}

async function create (orderData) {
  const { dishes: dishIds } = orderData
  const dishes = await dish.getSchemasByIds(dishIds)
  const newOrderData = { dishes }

  const newOrder = new Order(newOrderData)

  const error = newOrder.validateSync()
  if (error) throw error

  return newOrder.save()
}

async function deleteOneDishById (orderId, dishId) {
  const order = await Order.findById(orderId).exec()
  const { dishes = [] } = order

  const dishesFiltered = dishes.filter(dish => dish._id.toString() !== dishId)
  order.set('dishes', dishesFiltered)
  return order.save()
}

async function del (dishId) {
  const order = await Order.findById(dishId).exec()
  if (order) order.delete().exec()
}

async function addDish (orderId, dishId) {
  const order = await Order.findById(orderId).exec()
  if (!order) throw new Error(`order ${orderId} doesn't exists`)

  const dishToAdd = await dish.getById(dishId)
  if (!dishToAdd) throw new Error(`dish ${dishId} doesn't exists`)

  const { dishes: orderDishes } = order
  const newOrderDishes = [ ...orderDishes, dishToAdd ]
  order.set('dishes', newOrderDishes)
  return order.save()
}

async function update (dishId, dishData) {
  // @TODO: implement update dish functionality
}

module.exports = {
  getAll,
  create,
  del,
  update,
  deleteOneDishById,
  addDish
}
