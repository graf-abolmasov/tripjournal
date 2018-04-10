import { handleActions } from "redux-actions"

import HotPoint from './hot-points'

export default handleActions({
  [HotPoint.allSuccess]: (state, action) =>
    ({ ...state, hotTrack: action.payload }),
  [HotPoint.append]: (state, action) =>
    ({
      ...state,
      hotPoint: action.payload,
      hotTrack: [...state.hotTrack, action.payload]
    })
}, {
  hotTrack: [],
  hotPoint: window.JsEnv.hot_point,
})
