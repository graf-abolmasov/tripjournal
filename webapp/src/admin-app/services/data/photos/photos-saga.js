import randomize from 'randomatic'
import { takeEvery, take, call, put, takeLatest } from "redux-saga/effects"
import { END, eventChannel, buffers } from "redux-saga"
import { identity } from "ramda"

import cloudinary from "./cloudinary"
import photosActions from './photos-actions'
import Photo from './photos-api'

function progressiveFileUpload(uploader, file, options) {
  return eventChannel(emitter => {
    uploader(file, options, (event) => {
      emitter({progress: Math.trunc(event.loaded / event.total * 100)})
    }).then((response) => {
      emitter({response: response})
      emitter(END)
    }).catch((error) => {
      emitter({error: error})
      emitter(END)
    })
    return identity
  }, buffers.sliding(2))
}

function* uploadToCloudinarySaga(id, file, options) {
  const uploadChannel = yield call(progressiveFileUpload, cloudinary.uploadImage, file, options)

  while (true) {
    const {progress, response, error} = yield take(uploadChannel)
    if (response) {
      yield put(photosActions.uploadToClSuccess(id))
      return response.data
    }
    if (error) {
      yield put(photosActions.uploadToClFailure(id))
      throw error
    }
    yield put(photosActions.uploadToClProgress({id, progress}))
  }
}

function createPhotoSourceSaga(travelerId, clResource) {
  return Photo.create({
    traveler_id: travelerId,
    cl_public_id: clResource.public_id,
    meta: clResource
  })
}

function* doPhotoUploadRequestSaga(action) {
  const {traveler, trip, file} = action.payload

  const uploadId = randomize('*', 10)

  yield put(photosActions.uploadToClRequest({id: uploadId, preview: file.preview}))
  const cloudinaryResource = yield call(uploadToCloudinarySaga, uploadId, file, {
    tags: [`@${traveler.nickname}`, trip.name],
  })

  const photoSource = yield call(createPhotoSourceSaga, traveler.id, cloudinaryResource)

  yield put(photosActions.uploadPhotoSuccess({id: uploadId, photo: photoSource}))
  window.URL.revokeObjectURL(file.preview)
}

function* doAllPhotoRequestSaga() {
  const photos = yield call(Photo.all)
  yield put(photosActions.allPhotosSuccess(photos))
}

export default function* photosSaga() {
  yield takeEvery(photosActions.uploadPhotoRequest, doPhotoUploadRequestSaga)
  yield takeLatest(photosActions.allPhotosRequest,  doAllPhotoRequestSaga)
}