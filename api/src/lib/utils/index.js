
const intersection = require('lodash/intersection')
const camelCase = require('lodash/camelCase')
const isPlainObject = require('lodash/isPlainObject')
const snakeCase = require('lodash/snakeCase')

function validate (ctx, obj = {}, list = []) {
  list = typeof list === 'string' ? [list] : list
  const lack = list.find((value, index) => (!(value in obj)))
  if (lack) return ctx.throw(400, `Value of '${lack}' is required`)
}

function hasOne (ctx, obj = {}, list = []) {
  list = typeof list === 'string' ? [list] : list
  const has = list.some(item => Object.keys(obj).includes(item))
  if (!has) return ctx.throw(400, `At least one parameter in the list is required`)
}

function removeExtraData (obj = {}, list = []) {
  list = typeof list === 'string' ? [list] : list
  let inter = intersection(list, Object.keys(obj))

  return inter.reduce((accum, key) => {
    accum[key] = obj[key]
    return accum
  }, {})
}

const camelCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return {...reduce, [camelCase(key)]: isPlainObject(child) ? camelCaseObject(child) : child}
}, {})

const snakeCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return {...reduce, [snakeCase(key)]: isPlainObject(child) ? snakeCaseObject(child) : child}
}, {})

module.exports = {
  validate,
  hasOne,
  removeExtraData,
  camelCaseObject,
  snakeCaseObject
}
