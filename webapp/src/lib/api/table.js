
import get from 'lodash/get'

import apiFetch from './fetch'

async function getAll () {
  const data = await apiFetch('/table')
  return get(data, 'payload.table', [])
}