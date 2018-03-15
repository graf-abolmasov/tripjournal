import { takeLatest, call, put, all, takeEvery, throttle } from "redux-saga/effects"

import API from '../../services/api'
import tripsActions from './trips-actions'

function* loadTripsSaga({payload}) {
  const trips = yield call(API.fetchTrips)

  yield put(tripsActions.tripsLoaded(trips))
}

export default function* tripsSagas() {
  yield takeLatest(tripsActions.loadTrips, loadTripsSaga)
}
