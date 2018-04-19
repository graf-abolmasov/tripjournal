import { throttle, select, put, takeLatest } from "redux-saga/effects"
import { push } from 'react-router-redux'

import mapActions from './map-actions'
import IntPoint from '../../../common/models/int-points/int-points'
import galleryActions from '../GalleryView/gallery-actions'

function* newHotPointReceivedSaga({payload}) {
  const followTarget = yield select(state => state.ui.map.followTarget)

  if (followTarget) {
    yield put(mapActions.moveCenter(payload))
  }
}

function* openGallerySaga({payload}) {
  yield put(galleryActions.setSelectedIndex(payload))
  yield put(push("/gallery"))
}

function* moveCenterToHotPointSaga() {
  const hotPoint = yield select(state => state.data.hotPoint)
  yield put(mapActions.moveCenter(hotPoint))
}

export default function* mapSagas() {
  yield throttle(250, IntPoint.append, newHotPointReceivedSaga)
  yield takeLatest(mapActions.startFollowTarget, moveCenterToHotPointSaga)
  yield takeLatest(mapActions.openGallery, openGallerySaga)
}
