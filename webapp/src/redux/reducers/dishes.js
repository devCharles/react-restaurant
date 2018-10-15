
import { handleActions } from 'redux-actions'

const initialState = {
  list: []
}

export default handleActions({
  GET_DISHES: (state, { payload = [] }) => {
    console.warn('>> get all dishes: ', payload)
    return { ...state, list: [...payload] }
  }
}, initialState)
