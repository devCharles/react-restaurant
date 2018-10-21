
const get = require('lodash/get')

const dish = require('../../usecases/dish')
const utils = require('../../lib/utils/index')

const dishFields = [
  'name',
  'price',
  'description',
  'type'
]

module.exports = router => {
  router.get('/dishes', async ctx => {
    const allDishes = await dish.getAll()
    return ctx.resolve({ payload: { dishes: allDishes } })
  })

  router.post('/dishes', async ctx => {
    const requestData = get(ctx, 'request.body', {})
    const newDishData = utils.removeExtraData(requestData, dishFields)

    const newDish = await dish.create(newDishData)

    return ctx.resolve({ payload: { dish: newDish } })
  })
}
