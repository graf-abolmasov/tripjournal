import { takeLatest, call, put, all, takeEvery, throttle } from "redux-saga/effects"

import Track from '../../../common/models/tracks/tracks'
import IntPoint from '../../../common/models/int-points'
import HotPoint from '../../models/hot-points'
import appActions from './app-actions'
import cableActions from '../../action-cable/cable-actions'
import screenfull from "screenfull"

function* initializeAppSaga({payload}) {
  const [intPoints, hotTrack, tracks] = yield all([
    call(IntPoint.all),
    call(HotPoint.all),
    call(Track.all)
  ])

  yield all([
    put(IntPoint.allSuccess(intPoints)),
    put(HotPoint.allSuccess(hotTrack)),
    put(Track.allSuccess(tracks)),
  ])

  yield put(cableActions.connectTo(payload.id))
}

function *switchToFullScreenSaga() {
  screenfull.request()
}

function* newPointReceivedSaga({payload}) {
  yield put(HotPoint.append(payload))
}

export default function* appSagas() {
  yield takeEvery(cableActions.dataReceived, newPointReceivedSaga)

  yield takeLatest(appActions.start, initializeAppSaga)
  yield takeLatest(appActions.requestFullScreen, switchToFullScreenSaga)
}
