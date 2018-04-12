import { routerReducer } from "react-router-redux"
import appReducer from './views/App/app-reducer'
import dataReducer from './models/data-reducer'
import mapReducer from './views/MapView/map-reducer'
import galleryReducer from './views/GalleryView/gallery-reducer'
import { combineReducers } from "redux"

export default combineReducers({
  ui: combineReducers({
    map: mapReducer,
    settings: appReducer,
    gallery: galleryReducer,
  }),
  data: dataReducer,
  routing: routerReducer,
  session: () => window.JsEnv.session,
})
