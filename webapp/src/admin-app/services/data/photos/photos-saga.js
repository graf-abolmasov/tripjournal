import randomize from 'randomatic'
import { takeEvery, take, call, put, takeLatest } from "redux-saga/effects"

import Photo from '../../../models/photos'
import cloudinary, { uploadToCloudinarySagaFactory } from "../../cloudinary"

const uploadToCloudinarySaga = uploadToCloudinarySagaFactory(
  cloudinary.uploadPhoto,
  Photo.uploadToClProgress
)

function doPhotoSourceCreateRequest(clResource) {
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
  yield put(Photo.uploadToClSuccess(uploadId))

  const photoSource = yield call(doPhotoSourceCreateRequest, cloudinaryResource)
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