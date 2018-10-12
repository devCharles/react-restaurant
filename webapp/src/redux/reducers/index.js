
import { combineReducers } from 'redux'

import table from './tables'
import order from './orders'
import ui from './ui'

export default combineReducers({
  table,
  order,
  ui
})
