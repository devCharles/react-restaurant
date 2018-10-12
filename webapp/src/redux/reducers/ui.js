
import { handleActions } from 'redux-actions'

const initialState = {
  user: '',
  sectionName: 'Mesas'
}

export default handleActions({
  SET_SECTION_NAME: (state, { payload = '' }) => {
    return { ...state, sectionName: payload }
  }
}, initialState)
