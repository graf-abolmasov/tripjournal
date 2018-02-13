import { takeLatest, call, put, all, takeEvery, throttle } from "redux-saga/effects"

import API from '../../services/api'
import appActions from './app-actions'
import cableActions from '../../action-cable/cable-actions'

function* initializeAppSaga() {
  const [intPoints, hotTrack, tracks] = yield all([
    call(API.fetchIntPoints),
    call(API.fetchhotTrack),
    call(API.fetchTracks)
  ])

  yield all([
    put(appActions.intPointsLoaded(intPoints)),
    put(appActions.hotTrackLoaded(hotTrack)),
    put(appActions.tracksLoaded(tracks)),
  ])

  yield put(cableActions.connectTo())
}

function* newPointReceivedSaga({payload}) {
  yield put(appActions.moveHotPoint(payload))
}

export default function* appSagas() {
  yield takeEvery(cableActions.dataReceived, newPointReceivedSaga)

  yield takeLatest(appActions.start, initializeAppSaga)
}
