
const Dish = require('../models/dish').model

async function getAll () {
  return Dish.find({}).exec()
}

async function getById (dishId) {
  return Dish.findById(dishId).exec()
}

async function create (dishData) {
  const newDish = new Dish(dishData)
  const error = newDish.validateSync()
  if (error) throw error

  const equalDishes = await Dish.find({ ...dishData }).exec()

  if (equalDishes.length > 0) throw new Error('This dish already exists')
  return newDish.save()
}

async function del (dishId) {
  // @TODO: implement delete dish functionality
}

async function update (dishId, dishData) {
  // @TODO: implement update dish functionality
}

async function getSchemasByIds (dishIds = []) {
  if (!Array.isArray(dishIds)) throw new Error('dishIds has to be an Array')
  dishIds = dishIds.filter(dishId => dishId != null)

  const schemaPromises = dishIds.map(dishId => Dish.findById(dishId))
  return Promise.all(schemaPromises)
}

module.exports = {
  getAll,
  getById,
  create,
  del,
  update,
  getSchemasByIds
}
