import { routerReducer } from "react-router-redux"
import reduceReducers from 'reduce-reducers'
import appReducer from './views/App/app-reducer'
import mapReducer from './views/MapView/map-reducer'
import galleryReducer from './views/GalleryView/gallery-reducer'

export default reduceReducers(
  (state, action) => ({...state, routing: routerReducer(state.routing, action)}),
  appReducer,
  mapReducer,
  galleryReducer,
)