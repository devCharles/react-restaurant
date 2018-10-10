
const get = require('lodash/get')

const Table = require('../../models/table').model
const utils = require('../../lib/utils/index')

const tableFields = [
  'name',
  'price',
  'description',
  'type'
]

module.exports = router => {
  router.get('/table', async ctx => {
    const data = await Table.find({}).exec()
    ctx.resolve({ payload: { table: data } })
  })

  router.post('/table', async ctx => {
    const requestData = get(ctx, 'request.body', {})
    const newTableData = utils.removeExtraData(requestData, tableFields)
    const newTable = new Table(newTableData)

    const error = newTable.validateSync()
    if (error) throw ctx.throw(400, error.message)

    const equalTables = await Table.find({ ...newTableData }).exec()

    if (equalTables.length > 0) throw ctx.throw(400, 'This table already exists')
    const tableCreated = await newTable.save()

    ctx.resolve({ payload: { table: tableCreated } })
  })
}
