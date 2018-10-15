
import { createActions } from 'redux-actions'

import dishes from '../../lib/api/dishes'

export const GET_DISHES = 'GET_DISHES'

/* action creators */
const actions = createActions(
  {},
  GET_DISHES
)

// thunks
export const getDishes = () => async dispatch => {
  const allTables = await dishes.getAll()
  return dispatch(actions.getDishes(allTables))
}

export default actions
