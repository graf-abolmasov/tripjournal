export const moveMapCenter = (newCenter) => {
  return {
    type: 'MOVE_MAP_CENTER',
    newCenter: newCenter
  }
};

export const followTarget = () => {
  return {
    type: 'FOLLOW_TARGET'
  }
};

export const zoomMap = (newZoom) => {
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

export const intPointsLoaded = (data) => {
  return {
    type: 'INT_POINTS_LOADED',
    intPoints: data
  }
};

export const zoomIn = (data) => {
  return {
    type: 'ZOOM_IN',
  }
};

export const zoomOut = (data) => {
  return {
    type: 'ZOOM_OUT',
  }
};

export const closeBottomGallery = () => {
  return {
    type: 'CLOSE_BOTTOM_GALLERY'
  }
};

export const newSelectedIndex = (index) => {
  return {
    type: 'NEW_SELECTED_INDEX',
    index: index
  }
};

export const toggleSmallGallery = () => {
  return {
    type: 'TOGGLE_SMALL_GALLERY'
  }
};
