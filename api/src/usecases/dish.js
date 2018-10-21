
const Dish = require('../models/dish').model

async function getAll () {
  return Dish.find({}).exec()
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

module.exports = {
  getAll,
  create,
  del,
  update
}
