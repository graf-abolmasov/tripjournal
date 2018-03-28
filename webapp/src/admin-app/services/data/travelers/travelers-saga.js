import { call, put, takeLatest } from "redux-saga/effects"

import travelersActions from './travelers-actions'
import travelersApi from './travelers-api'

function* getAllTravelers() {
  const travelers = yield call(travelersApi.all)

  yield put(travelersActions.allTravelersSuccess(travelers))
}

export default function* travelersSaga() {
  yield takeLatest(travelersActions.allTravelersRequest, getAllTravelers)
}