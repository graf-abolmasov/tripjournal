import { combineReducers } from "redux"

import tracksReducer from '../../../common/models/tracks/tracks-reducer'
import photosReducer from './photos/photos-reducer'
import travelersReducer from './travelers/travelers-reducer'

export default combineReducers({
  photos: photosReducer,
  tracks: tracksReducer,
  travelers: travelersReducer,
  trip: () => window.JsEnv.trip,
  traveler: () => window.JsEnv.traveler,
})
