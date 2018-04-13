import { handleActions } from 'redux-actions'

import uiIntPointsActions from './ui-int-points-actions'
import { combineReducers } from "redux"

const uiIntPointsDetailsActions = uiIntPointsActions.details

const uiIntPointsDetailsReducer = handleActions({
  [uiIntPointsDetailsActions.setIntPointId]: (state, action) => {
    return { intPointId: Number(action.payload) }
  },
}, {
  intPointId: undefined
})

export default combineReducers({
  details: uiIntPointsDetailsReducer,
})
