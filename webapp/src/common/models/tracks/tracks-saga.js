import randomize from 'randomatic'
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

import Track from './tracks'
import cloudinary, { uploadToCloudinarySagaFactory } from "../../../admin-app/services/cloudinary"

const uploadToCloudinarySaga = uploadToCloudinarySagaFactory(
  cloudinary.uploadTrack,
  Track.uploadToClProgress
)

function* doAllTracksRequestSaga({payload}) {
  const tracks = yield call(Track.all, payload)
  yield put(Track.allSuccess(tracks))
}

function* doSmallTrackCreateRequest(file) {
  try {
    const uploadData = new FormData()
    uploadData.append("file", file)
    const tracks = yield call(Track.create, uploadData)
    yield put(Track.createSuccess({ tracks: tracks }))
  } catch (e) {
    yield put(Track.createFailure({error: e}))
  }
}

function* doBigTrackCreateRequest(file) {
  const uploadId = randomize('*', 10)
  try {
    yield put(Track.uploadToClRequest({ id: uploadId }))
    const cloudinaryResource = yield call(uploadToCloudinarySaga, uploadId, file)
    yield put(Track.uploadToClSuccess(uploadId))
    try {
      const tracks = yield call(Track.create, { remote_url: cloudinaryResource.url })
      yield put(Track.createSuccess({ id: uploadId, tracks: tracks }))
    } catch (e) {
      yield put(Track.createFailure({id: uploadId, error: e}))
    }
  } catch (e) {
    yield put(Track.uploadToClFailure({id: uploadId, error: e}))
  }
}

function* doTrackCreateRequestSaga({ payload }) {
  const { file } = payload

  yield call(doSmallTrackCreateRequest, file)
}

export default function* tracksSaga() {
  yield takeEvery(Track.createRequest, doTrackCreateRequestSaga)
  yield takeLatest(Track.allRequest, doAllTracksRequestSaga)
}