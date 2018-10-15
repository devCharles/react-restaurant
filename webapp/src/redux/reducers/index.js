
import { combineReducers } from 'redux'

import table from './tables'
import order from './orders'
import dishes from './dishes'
import ui from './ui'

export default combineReducers({
  table,
  order,
  dishes,
  ui
})
