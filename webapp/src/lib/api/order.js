
import get from 'lodash/get'

import apiFetch from './fetch'

const getAll = async () => {
  const response = await apiFetch('/orders')
  const data = response.ok ? await response.json() : {}
  const orders = get(data, 'payload.orders', [])
  return orders
}

const create = async (name = 'Orden', dishes = []) => {
  const response = await apiFetch('/orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name,
      dishes
    })
  })
  if (response.ok) return response.json()
  throw new Error('Order already exists')
}

const addDish = async (orderId, dishId) => {
  const response = await apiFetch(`/order/${orderId}/dish/${dishId}`, {
    method: 'PATCH'
  })
  if (response.ok) return true
  return false
}

const removeDish = async (orderId, dishId) => {
  const response = await apiFetch(`/order/${orderId}/dish/${dishId}`, {
    method: 'DELETE'
  })
  if (response.ok) return true
  return false
}

export default {
  getAll,
  create,
  addDish,
  removeDish
}
