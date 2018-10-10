
import { combineReducers } from 'redux'

import table from './tables'
import order from './orders'

export default combineReducers({
  table,
  order
})
