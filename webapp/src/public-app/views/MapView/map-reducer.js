import { handleActions } from 'redux-actions'

import mapActions from './map-actions'

export default handleActions({
  [mapActions.moveCenter]: (state, action) =>
    ({...state, center: action.payload}),
  [mapActions.startFollowTarget]: (state) =>
    ({...state, followTarget: true, center: state.hotPoint, zoom: state.zoom < 13 ? 13 : state.zoom}),
  [mapActions.stopFollowTarget]: (state) =>
    ({...state, followTarget: false}),
  [mapActions.zoomMap]: (state, action) =>
    ({...state, zoom: action.payload}),
  [mapActions.zoomIn]:
    (state) => ({...state, zoom: state.zoom < state.maxZoom ? state.zoom + 1 : state.zoom}),
  [mapActions.zoomOut]:
    (state) => ({...state, zoom: state.zoom > state.minZoom ? state.zoom - 1 : state.zoom}),
}, {})
