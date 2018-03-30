import { call, put, takeLatest } from "redux-saga/effects"

import Traveler from '../../../models/travelers'

function* getAllTravelers() {
  const travelers = yield call(Traveler.all)
  yield put(Traveler.allSuccess(travelers))
}

export default function* travelersSaga() {
  yield takeLatest(Traveler.allRequest, getAllTravelers)
}