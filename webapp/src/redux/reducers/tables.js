
import { handleActions } from 'redux-actions'

const initialState = {
  existing: [],
  new: {}
}

// function tableReducer (state = initialState, action) {
//   return { ...initialState }
// }

export default handleActions({
  GET_ALL_TABLES: (state, { payload = [] }) => {
    console.warn('>> get all tables: ', payload)
    return { ...state, existing: [...payload] }
  },
  SAVE_TABLE: (state, { payload = {} }) => {
    return { ...state, new: { ...payload } }
  }
}, initialState)
