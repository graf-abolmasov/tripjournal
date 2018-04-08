import randomize from 'randomatic'
import { takeEvery, take, call, put, takeLatest } from "redux-saga/effects"
import { END, eventChannel, buffers } from "redux-saga"
import { identity } from "ramda"

import Photo from '../../../models/photos'
import cloudinary from "./cloudinary"

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
      yield put(Photo.uploadToClSuccess(id))
      return response.data
    }
    if (error) {
      yield put(Photo.uploadToClFailure(id))
      throw error
    }
    yield put(Photo.uploadToClProgress({id, progress}))
  }
}

function createPhotoSourceAsync(clResource) {
  return Photo.create({
    cl_public_id: clResource.public_id,
    meta: clResource
  })
}

function* doPhotoUploadRequestSaga(action) {
  const {traveler, trip, file} = action.payload

  const uploadId = randomize('*', 10)

  yield put(Photo.uploadToClRequest({id: uploadId, preview: file.preview}))
  const cloudinaryResource = yield call(uploadToCloudinarySaga, uploadId, file, {
    tags: [`@${traveler.nickname}`, `#${trip.name}`],
  })

  const photoSource = yield call(createPhotoSourceAsync, cloudinaryResource)

  yield put(Photo.uploadSuccess({id: uploadId, photo: photoSource}))
  window.URL.revokeObjectURL(file.preview)
}

function* doAllPhotoRequestSaga() {
  const photos = yield call(Photo.all)
  yield put(Photo.allSuccess(photos))
}

export default function* photosSaga() {
  yield takeEvery(Photo.uploadRequest, doPhotoUploadRequestSaga)
  yield takeLatest(Photo.allRequest,   doAllPhotoRequestSaga)
}