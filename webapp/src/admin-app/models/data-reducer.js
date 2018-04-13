import { combineReducers } from "redux"

import intPointsReducer from '../../common/models/int-points/int-points-reducer'
import tracksReducer from '../../common/models/tracks/tracks-reducer'
import photosReducer from './photos/photos-reducer'
import travelersReducer from './travelers/travelers-reducer'

export default combineReducers({
  intPoints: intPointsReducer,
  photos: photosReducer,
  tracks: tracksReducer,
  travelers: travelersReducer,
  trip: () => window.JsEnv.trip,
  traveler: () => window.JsEnv.traveler,
})
