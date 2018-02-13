import { throttle, select, put } from "redux-saga/effects"

import mapActions from './map-actions'
import appActions from '../App/app-actions'

function* newHotPointReceivedSaga({payload}) {
  const followTarget = yield select(state => state.followTarget)

  if (followTarget) {
    yield put(mapActions.moveCenter(payload))
  }
}

export default function* mapSagas() {
  yield throttle(250, appActions.moveHotPoint, newHotPointReceivedSaga)
}
