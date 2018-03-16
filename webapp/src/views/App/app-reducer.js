import { handleActions } from 'redux-actions'

import appActions from './app-actions'

export default handleActions({
  [appActions.intPointsLoaded]: (state, action) =>
    ({...state, intPoints: action.payload, ajax: {...state.ajax, intPoints: true}}),
  [appActions.tracksLoaded]: (state, action) =>
    ({...state, tracks: action.payload, ajax: {...state.ajax, tracks: true}}),
  [appActions.hotTrackLoaded]: (state, action) =>
    ({...state, hotTrack: action.payload, ajax: {...state.ajax, hotTrack: true}}),
  [appActions.requestFullScreen]: (state) =>
    ({...state, isFullScreen: true}),
  [appActions.moveHotPoint]: (state, action) =>
    ({
      ...state,
      hotPoint: action.payload,
      hotTrack: [...state.hotTrack, action.payload]
    })
}, {})