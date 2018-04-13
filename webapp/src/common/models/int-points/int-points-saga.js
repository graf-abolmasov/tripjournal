import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

import IntPoint from './int-points'

function* doIntPointUpdateRequestSaga({payload}) {
  const intPoint = yield call(IntPoint.update, payload)
  yield put(IntPoint.updateSuccess(intPoint))
}

function* doIntPointDestroyRequestSaga({payload}) {
  yield call(IntPoint.destroy, payload)
  yield put(IntPoint.destroySuccess(payload))
}

function* doIntPointAllRequestSaga() {
  const intPoints = yield call(IntPoint.all)
  yield put(IntPoint.allSuccess(intPoints))
}

export default function* tracksSaga() {
  yield takeLatest(IntPoint.allRequest,    doIntPointAllRequestSaga)
  yield takeLatest(IntPoint.updateRequest, doIntPointUpdateRequestSaga)
  yield takeEvery(IntPoint.destroyRequest, doIntPointDestroyRequestSaga)
}