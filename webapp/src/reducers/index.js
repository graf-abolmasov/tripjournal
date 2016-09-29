const defaultReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_MAP_CENTER':
      return Object.assign({}, state, { center: action.newCenter });
    case 'STOP_FOLLOW_TARGET':
      return Object.assign({}, state, { followTarget: false });
    case 'FOLLOW_TARGET':
      return Object.assign({}, state, { followTarget: true });
    case 'ZOOM_MAP':
      return Object.assign({}, state, { zoom: action.newZoom });
    case 'MOVE_HOT_POINT':
      return Object.assign({}, state, {
        hotPoint: action.newHotPoint,
        hotPoints: state.hotPoints.concat([action.newHotPoint])
      });
    case 'PINS_LOADED':
      return Object.assign({}, state, { pins: action.pins });
    case 'TRACKS_LOADED':
      return Object.assign({}, state, { tracks: action.tracks });
    case 'HOT_POINTS_LOADED':
      return Object.assign({}, state, { hotPoints: action.hotPoints });
    default:
      return state
  }
};

export default defaultReducer