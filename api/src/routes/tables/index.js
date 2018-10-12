
const get = require('lodash/get')

const Table = require('../../models/table').model
const utils = require('../../lib/utils/index')

const tableFields = [
  'name',
  'customersNumber',
  'isTaken'
]

module.exports = router => {
  router.get('/tables', async ctx => {
    const data = await Table.find({}).exec()
    return ctx.resolve({ payload: { table: data } })
  })

  router.post('/tables', async ctx => {
    const requestData = get(ctx, 'request.body', {})
    const newTableData = utils.removeExtraData(requestData, tableFields)
    const newTable = new Table(newTableData)

    const error = newTable.validateSync()
    if (error) throw ctx.throw(400, error.message)

    const equalTables = await Table.find({ ...newTableData }).exec()

    if (equalTables.length > 0) throw ctx.throw(400, 'This table already exists')
    const tableCreated = await newTable.save()

    return ctx.resolve({ payload: { table: tableCreated } })
  })
}
