import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"

import dataReducer from './models/data-reducer'
import uiTracksReducer from './views/tracks/ui-tracks-reducer'
import uiIntPointsReducer from './views/int-points/ui-int-points-reducer'

export default combineReducers({
  ui: combineReducers({
    tracks: uiTracksReducer,
    intPoints: uiIntPointsReducer,
  }),
  data: dataReducer,
  routing: routerReducer,
  session: () => window.JsEnv.session,
})
