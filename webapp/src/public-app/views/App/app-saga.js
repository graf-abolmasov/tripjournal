import { takeLatest, call, put, all, takeEvery, throttle } from "redux-saga/effects"

import API from '../../services/api'
import appActions from './app-actions'
import dataActions from '../../services/data-actions'
import cableActions from '../../action-cable/cable-actions'
import screenfull from "screenfull"

function* initializeAppSaga({payload}) {
  const [intPoints, hotTrack, tracks] = yield all([
    call(API.fetchIntPoints, payload.id),
    call(API.fetchHotTrack, payload.id),
    call(API.fetchTracks, payload.id)
  ])

  yield all([
    put(dataActions.intPointsLoaded(intPoints)),
    put(dataActions.hotTrackLoaded(hotTrack)),
    put(dataActions.tracksLoaded(tracks)),
  ])

  yield put(cableActions.connectTo(payload.id))
}

function *switchToFullScreenSaga() {
  screenfull.request()
}

function* newPointReceivedSaga({payload}) {
  yield put(dataActions.moveHotPoint(payload))
}

export default function* appSagas() {
  yield takeEvery(cableActions.dataReceived, newPointReceivedSaga)

  yield takeLatest(appActions.start, initializeAppSaga)
  yield takeLatest(appActions.requestFullScreen, switchToFullScreenSaga)
}
