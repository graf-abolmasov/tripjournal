import { combineReducers } from "redux"

import photosReducer from './photos/photos-reducer'
import travelersReducer from './travelers/travelers-reducer'

export default combineReducers({
  photos: photosReducer,
  travelers: travelersReducer,
  trip: () => window.JsEnv.trip,
  traveler: () => window.JsEnv.traveler,
})
