import { handleActions } from 'redux-actions'

import mapActions from './map-actions'
import storejs from "storejs"

let storedFollowTarget = false
if (localStorage && storejs.has('followTarget')) {
  storedFollowTarget = storejs.get('followTarget')
}

export default handleActions({
  [mapActions.moveCenter]: (state, action) =>
    ({...state, center: action.payload}),
  [mapActions.zoomMap]: (state, action) =>
    ({...state, zoom: action.payload}),
  [mapActions.zoomIn]:
    (state) => ({...state, zoom: state.zoom < state.maxZoom ? state.zoom + 1 : state.zoom}),
  [mapActions.zoomOut]:
    (state) => ({...state, zoom: state.zoom > state.minZoom ? state.zoom - 1 : state.zoom}),
  [mapActions.startFollowTarget]: (state) =>
    ({...state, followTarget: true, zoom: state.zoom < 13 ? 13 : state.zoom}),
  [mapActions.stopFollowTarget]: (state) =>
    ({...state, followTarget: false}),
}, {
  center: (localStorage && storejs.get('center')) || window.JsEnv.hot_point,
  zoom: (localStorage && storejs.get('zoom')) || 13,
  minZoom: 4,
  maxZoom: 16,
  followTarget: storedFollowTarget,
})
