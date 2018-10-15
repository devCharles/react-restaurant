
import get from 'lodash/get'

import apiFetch from './fetch'

const getAll = async () => {
  const response = await apiFetch('/dishes')
  const data = response.ok ? await response.json() : {}
  const dishes = get(data, 'payload.dishes', [])
  return dishes
}

export default {
  getAll
}
