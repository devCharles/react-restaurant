
const get = require('lodash/get')

const Dish = require('../../models/dish').model
const utils = require('../../lib/utils/index')

const dishFields = [
  'name',
  'price',
  'description',
  'type'
]

module.exports = router => {
  router.get('/dishes', async ctx => {
    const data = await Dish.find({}).exec()
    ctx.resolve({ payload: { dishes: data } })
  })

  router.post('/dishes', async ctx => {
    console.warn('body: ', ctx.request.body)
    const requestData = get(ctx, 'request.body', {})
    const newDishData = utils.removeExtraData(requestData, dishFields)
    const newDish = new Dish(newDishData)

    const error = newDish.validateSync()
    if (error) throw ctx.throw(400, error.message)

    const alreadyExists = await Dish.find({ ...newDishData }).exec()

    if (alreadyExists) throw ctx.throw(400, 'This dish already exists')
    const dishCreated = await newDish.save()

    console.warn('dish created: ', dishCreated)
    ctx.resolve({ payload: { dish: dishCreated } })
  })
}
