import { put, throttle, select, all } from "redux-saga/effects"

import galleryActions from './gallery-actions'
import mapActions from '../MapView/map-actions'
import { takeEvery } from "redux-saga/effects"

function* openGallerySaga() {
  const index = yield select((state) => (state.ui.gallery.selectedIntPointIndex))
  const intPoint = yield select((state) => (state.data.intPoints[index]))

  if (intPoint && intPoint.lat && intPoint.lng) {
    yield all([
      put(mapActions.moveCenter(intPoint)),
      put(mapActions.stopFollowTarget())
    ])
  }
}

function* checkIndexRange() {
  let index = yield select((state) => (state.ui.gallery.selectedIntPointIndex))
  const intPoints = yield select((state) => (state.data.intPoints))
  if (index >= intPoints.length) {
    yield put(galleryActions.setSelectedIndex(0))
  }
  if (index < 0) {
    yield put(galleryActions.setSelectedIndex(intPoints.length - 1))
  }
}

export default function* gallerySagas() {
  yield takeEvery(galleryActions.setSelectedIndex, checkIndexRange)
  yield throttle(1500, galleryActions.setSelectedIndex, openGallerySaga)
}

