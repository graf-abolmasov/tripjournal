import { takeLatest, call, put, all, takeEvery, throttle } from "redux-saga/effects"

import API from '../../services/api'
import appActions from './app-actions'
import cableActions from '../../action-cable/cable-actions'

function* initializeAppSaga({payload}) {
  const [intPoints, hotTrack, tracks] = yield all([
    call(API.fetchIntPoints, payload.id),
    call(API.fetchHotTrack, payload.id),
    call(API.fetchTracks, payload.id)
  ])

  yield all([
    put(appActions.intPointsLoaded(intPoints)),
    put(appActions.hotTrackLoaded(hotTrack)),
    put(appActions.tracksLoaded(tracks)),
  ])

  yield put(cableActions.connectTo(payload.id))
}

function* newPointReceivedSaga({payload}) {
  yield put(appActions.moveHotPoint(payload))
}

export default function* appSagas() {
  yield takeEvery(cableActions.dataReceived, newPointReceivedSaga)

  yield takeLatest(appActions.start, initializeAppSaga)
}
