import { LOCATION_CHANGE } from "react-router-redux";

const defaultReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_MAP_CENTER':
      return Object.assign({}, state, { center: action.newCenter, followTarget: false });
    case 'FOLLOW_TARGET':
      return Object.assign({}, state, {
        followTarget: true,
        center: state.hotPoint,
        zoom: state.zoom < 13 ? 13 : state.zoom
      });
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

    case 'INT_POINTS_LOADED':
      return Object.assign({}, state, { intPoints: action.intPoints, ajax: { ...state.ajax, intPoints: true } });
    case 'TRACKS_LOADED':
      return Object.assign({}, state, { tracks: action.tracks, ajax: { ...state.ajax, tracks: true } });
    case 'HOT_POINTS_LOADED':
      return Object.assign({}, state, { hotPoints: action.hotPoints, ajax: { ...state.ajax, hotPoints: true } });

    case 'NEW_SELECTED_INDEX':
      let index = action.index;
      if (index >= state.intPoints.length) {
        index = 0;
      }
      if (index < 0) {
        index = state.intPoints.length - 1
      }
      return Object.assign({}, state, { selectedIntPointIndex: index });

    case 'TOGGLE_SMALL_GALLERY':
      if (state.selectedIntPointIndex !== undefined) {
        return Object.assign({}, state, { selectedIntPointIndex: undefined });
      } else {
        return Object.assign({}, state, { selectedIntPointIndex: 0 });
      }

    case LOCATION_CHANGE:
      return Object.assign({}, state, { routing: { locationBeforeTransitions: action.payload } });

    case 'REQUEST_FULL_SCREEN':
      return Object.assign({}, state, { isFullscreen: true });

    default:
      return state
  }
};

export default defaultReducer