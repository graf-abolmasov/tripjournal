import { throttle, select, put, takeLatest } from "redux-saga/effects"
import { push } from 'react-router-redux'

import mapActions from './map-actions'
import appActions from '../App/app-actions'
import galleryActions from '../GalleryView/gallery-actions'

function* newHotPointReceivedSaga({payload}) {
  const followTarget = yield select(state => state.followTarget)

  if (followTarget) {
    yield put(mapActions.moveCenter(payload))
  }
}

function* openGallerySaga({payload}) {
  yield put(push("/gallery"))
  yield put(galleryActions.setSelectedIndex(payload))
}

export default function* mapSagas() {
  yield throttle(250, appActions.moveHotPoint, newHotPointReceivedSaga)
  yield takeLatest(mapActions.openGallery, openGallerySaga)
}
