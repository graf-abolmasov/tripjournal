import reduceReducers from 'reduce-reducers'

import intPointsReducer from '../../common/models/int-points/int-points-reducer'
import tracksReducer from '../../common/models/tracks/tracks-reducer'
import hotPointsReducer from '../models/hot-points/hot-points-reducer'

export default reduceReducers(
  hotPointsReducer,
  (state, action) => ({ ...state, intPoints: intPointsReducer(state.intPoints, action) }),
  (state, action) => ({ ...state, tracks: tracksReducer(state.tracks, action) }),
  (state, action) => ({ ...state, trip: window.JsEnv.trip }),
)

