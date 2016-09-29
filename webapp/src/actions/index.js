import storejs from 'storejs';

export const moveMapCenter = (newCenter) => {
  storejs.set('center', newCenter);
  return {
    type: 'MOVE_MAP_CENTER',
    newCenter: newCenter
  }
};

export const stopFollowTarget = () => {
  storejs.set('followTarget', false);
  return {
    type: 'STOP_FOLLOW_TARGET'
  }
};

export const followTarget = () => {
  storejs.set('followTarget', true);
  return {
    type: 'FOLLOW_TARGET'
  }
};

export const zoomMap = (newZoom) => {
  storejs.set('zoom', newZoom);
  return {
    type: 'ZOOM_MAP',
    newZoom: newZoom
  }
};

export const moveHotPoint = (newHotPoint) => {
  return {
    type: 'MOVE_HOT_POINT',
    newHotPoint: newHotPoint
  }
};

export const hotPointsLoaded = (data) => {
  return {
    type: 'HOT_POINTS_LOADED',
    hotPoints: data
  }
};

export const tracksLoaded = (data) => {
  return {
    type: 'TRACKS_LOADED',
    tracks: data
  }
};

export const pinsLoaded = (data) => {
  return {
    type: 'PINS_LOADED',
    pins: data
  }
};
