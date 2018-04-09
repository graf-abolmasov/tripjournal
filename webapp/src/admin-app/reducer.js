import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"

import dataReducer from './services/data/data-reducer'
import uiUploadTrackReducer from './views/tracks/ui-upload-track-reducer'

export default combineReducers({
  ui: combineReducers({
    tracks: uiUploadTrackReducer,
  }),
  data: dataReducer,
  routing: routerReducer,
})
