import { handleActions } from 'redux-actions'

import galleryActions from './gallery-actions'

export default handleActions({
  [galleryActions.setSelectedIndex]: (state, action) => {
    let index = action.payload
    if (index >= state.intPoints.length) {
      index = 0
    }
    if (index < 0) {
      index = state.intPoints.length - 1
    }
    return {...state, selectedIntPointIndex: index}
  }
}, {})
