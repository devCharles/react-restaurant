
import get from 'lodash/get'

import apiFetch from './fetch'

const getAll = async () => {
  const response = await apiFetch('/table')
  const data = response.ok ? await response.json() : {}
  const tables = get(data, 'payload.table', [])
  console.warn('>> data fetched: ', tables)
  return tables
}

export default {
  getAll
}