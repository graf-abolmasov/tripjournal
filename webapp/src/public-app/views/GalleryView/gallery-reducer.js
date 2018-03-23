import { handleActions } from 'redux-actions'

import galleryActions from './gallery-actions'

export default handleActions({
  [galleryActions.setSelectedIndex]: (state, action) => {
    return {...state, selectedIntPointIndex: action.payload}
  }
}, {
  selectedIntPointIndex: 0
})
