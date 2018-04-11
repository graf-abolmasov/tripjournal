import { handleActions } from 'redux-actions'

import uiTracksActions from './ui-tracks-actions'
import { combineReducers } from "redux"

const uiTracksDetailsActions = uiTracksActions.details

const uiTracksDetailsReducer = handleActions({
  [uiTracksDetailsActions.setTrackId]: (state, action) => {
    return { trackId: Number(action.payload) }
  },
}, {
  trackId: undefined
})

export default combineReducers({
  details: uiTracksDetailsReducer,
})
