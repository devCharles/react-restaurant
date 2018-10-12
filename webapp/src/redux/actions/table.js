
import { createActions } from 'redux-actions'

import table from '../../lib/api/table'

export const GET_TABLE = 'GET_TABLE'
export const GET_ALL_TABLES = 'GET_ALL_TABLES'
export const SAVE_TABLE = 'SAVE_TABLE'

/* action creators */
const actions = createActions(
  {
    [SAVE_TABLE]: (id) => ({ id })
  },
  GET_ALL_TABLES,
  SAVE_TABLE
)

export const getTables = () => async dispatch => {
  const allTables = await table.getAll()
  return dispatch(actions.getAllTables(allTables))
}

export default actions
