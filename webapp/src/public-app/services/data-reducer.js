import { handleActions } from 'redux-actions'

import IntPoint from '../../common/models/int-points'
import HotPoint from '../models/hot-points'
import Track from '../models/tracks'

export default handleActions({
  [IntPoint.allSuccess]: (state, action) =>
    ({...state, intPoints: action.payload}),
  [HotPoint.allSuccess]: (state, action) =>
    ({...state, hotTrack: action.payload}),
  [Track.allSuccess]: (state, action) =>
    ({...state, tracks: action.payload}),
  [HotPoint.append]: (state, action) =>
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
