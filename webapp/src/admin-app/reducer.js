import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"

import dataReducer from './models/data-reducer'
import uiTracksReducer from './views/tracks/ui-upload-track-reducer'

export default combineReducers({
  ui: combineReducers({
    tracks: uiTracksReducer,
  }),
  data: dataReducer,
  routing: routerReducer,
})
