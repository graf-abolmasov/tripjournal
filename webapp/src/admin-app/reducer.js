import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"

import dataReducer from './services/data/data-reducer'

export default combineReducers({
  data: dataReducer,
  routing: routerReducer,
})
