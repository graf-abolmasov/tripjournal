import { handleActions } from 'redux-actions'

import dataActions from './data-actions'

export default handleActions({
  [dataActions.intPointsLoaded]: (state, action) =>
    ({...state, intPoints: action.payload}),
  [dataActions.tracksLoaded]: (state, action) =>
    ({...state, tracks: action.payload}),
  [dataActions.hotTrackLoaded]: (state, action) =>
    ({...state, hotTrack: action.payload}),
  [dataActions.moveHotPoint]: (state, action) =>
    ({
      ...state,
      hotPoint: action.payload,
      hotTrack: [...state.hotTrack, action.payload]
    })
}, {
  intPoints: [],
  tracks: [],
  hotTrack: [],
  hotPoint: window.JsEnv.hot_point,
  trip: window.JsEnv.trip,
})
