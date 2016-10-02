import { LOCATION_CHANGE } from 'react-router-redux'

const defaultReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_MAP_CENTER':
      return Object.assign({}, state, { center: action.newCenter, followTarget: false });
    case 'FOLLOW_TARGET':
      return Object.assign({}, state, { followTarget: true, center: state.hotPoint, zoom: state.zoom < 13 ? 13 : state.zoom });
    case 'ZOOM_MAP':
      return Object.assign({}, state, { zoom: action.newZoom });
    case 'ZOOM_IN':
      return Object.assign({}, state, { zoom: state.zoom < state.maxZoom ? state.zoom + 1 : state.zoom });
    case 'ZOOM_OUT':
      return Object.assign({}, state, { zoom: state.zoom > state.minZoom ? state.zoom - 1 : state.zoom });
    case 'MOVE_HOT_POINT':
      return Object.assign({}, state, {
        hotPoint: action.newHotPoint,
        hotPoints: [...state.hotPoints, action.newHotPoint],
        center: state.followTarget ? action.newHotPoint : state.center
      });
    case 'PINS_LOADED':
      return Object.assign({}, state, { pins: action.pins });
    case 'TRACKS_LOADED':
      return Object.assign({}, state, { tracks: action.tracks });
    case 'HOT_POINTS_LOADED':
      return Object.assign({}, state, { hotPoints: action.hotPoints });
    case LOCATION_CHANGE:
      return Object.assign({}, state, { routing: { locationBeforeTransitions: action.payload } });
    default:
      return state
  }
};

export default defaultReducer