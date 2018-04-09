import { call, put, takeEvery } from "redux-saga/effects"

import Track from '../../../models/tracks'

function* doTrackUploadRequestSaga({payload: {file}}) {
  const uploadData = new FormData()
  uploadData.append("file", file)

  const track = yield call(Track.create, uploadData, {timeout: 60000})
  yield put(Track.uploadSuccess(track))
}

export default function* tracksSaga() {
  yield takeEvery(Track.uploadRequest, doTrackUploadRequestSaga)
}