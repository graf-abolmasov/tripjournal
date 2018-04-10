import axios from 'axios'
import { END, eventChannel, buffers } from "redux-saga"
import { call, put, take } from "redux-saga/effects"
import { identity } from "ramda"

const cl_api_key = window.JsEnv.cl.api_key
const cl_photo_upload_url = window.JsEnv.cl.photo_sources.url
const cl_photo_upload_presect = window.JsEnv.cl.photo_sources.preset
const cl_track_upload_url = window.JsEnv.cl.tracks.url
const cl_track_upload_presect = window.JsEnv.cl.tracks.preset
const env = window.JsEnv.env

function uploader(cl_preset, cl_upload_url) {
  return function (file, options = { tags: [] }, onUploadProgress = () => {
  }) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("tags", options.tags)
    formData.append("context", `env=${env}`)
    formData.append("api_key", cl_api_key)
    formData.append("upload_preset", cl_preset)

    return axios.post(cl_upload_url, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: onUploadProgress
    })
  }
}

function progressiveFileUpload(uploader, file, options) {
  return eventChannel(emitter => {
    uploader(file, options, (event) => {
      emitter({ progress: Math.trunc(event.loaded / event.total * 100) })
    }).then((response) => {
      emitter({ response: response })
      emitter(END)
    }).catch((error) => {
      emitter({ error: error })
      emitter(END)
    })
    return identity
  }, buffers.sliding(2))
}

export function uploadToCloudinarySagaFactory(uploader, onProgress) {
  return function* (id, file, options) {
    const uploadChannel = yield call(progressiveFileUpload, uploader, file, options)

    while (true) {
      const { progress, response, error } = yield take(uploadChannel)
      if (response) {
        return response.data
      }
      if (error) {
        throw error
      }
      yield put(onProgress({ id, progress }))
    }
  }
}

export default {
  uploadPhoto: uploader(cl_photo_upload_presect, cl_photo_upload_url),
  uploadTrack: uploader(cl_track_upload_presect, cl_track_upload_url),
}

