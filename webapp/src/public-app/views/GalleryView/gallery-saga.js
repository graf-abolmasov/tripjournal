import { put, throttle, select, all } from "redux-saga/effects"

import galleryActions from './gallery-actions'
import mapActions from '../MapView/map-actions'

function* openGallerySaga() {
  const index = yield select((state) => (state.selectedIntPointIndex))
  const intPoint = yield select((state) => (state.intPoints[index]))

  if (intPoint && intPoint.lat && intPoint.lng) {
    yield all([
      put(mapActions.moveCenter(intPoint)),
      put(mapActions.stopFollowTarget())
    ])
  }
}

export default function* gallerySagas() {
  yield throttle(1500, galleryActions.setSelectedIndex, openGallerySaga)
}

