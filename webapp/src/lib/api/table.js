
import get from 'lodash/get'

import apiFetch from './fetch'

const getAll = async () => {
  const response = await apiFetch('/tables')
  const data = response.ok ? await response.json() : {}
  const tables = get(data, 'payload.table', [])
  return tables
}

const create = async (tableName) => {
  const response = await apiFetch('/tables', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name: tableName })
  })
  if (response.ok) return true
  return false
}

export default {
  getAll,
  create
}
