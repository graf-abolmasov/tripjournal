import { handleActions } from 'redux-actions'

import galleryActions from './gallery-actions'

const newIntPointSelected = (state, index) => {
  if (index < 0 || index >= state.intPoints.length) {
    return {selectedIntPointIndex: undefined}
  }
  const intPoint = state.intPoints[index]
  if (intPoint.lat && intPoint.lng) {
    return {
      selectedIntPointIndex: index,
      center: {lat: intPoint.lat, lng: intPoint.lng},
      followTarget: false
    }
  }
  return {selectedIntPointIndex: index}
}

export default handleActions({
  [galleryActions.setSelectedIndex]: (state, action) => {
    let index = action.payload
    if (index >= state.intPoints.length) {
      index = 0
    }
    if (index < 0) {
      index = state.intPoints.length - 1
    }
    return {...state, ...newIntPointSelected(state, index)}
  },
  [galleryActions.toggleDesktopGalleryThumbnails]: (state) => {
    if (state.selectedIntPointIndex !== undefined) {
      return {...state, selectedIntPointIndex: undefined}
    } else {
      return {...state, ...newIntPointSelected(state, 0)}
    }
  },
}, {})
