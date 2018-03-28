import axios from 'axios'

const cl_api_key = window.JsEnv.cl.api_key
const cl_upload_url = `${window.JsEnv.cl.upload_url}`
const cl_upload_preset = window.JsEnv.cl.upload_preset
const env = window.JsEnv.env

export default {
  uploadImage: (file, options = {tags: []}, onUploadProgress = () => {}) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("tags", options.tags)
    formData.append("context", `env=${env}`)
    formData.append("api_key", cl_api_key)
    formData.append("upload_preset", cl_upload_preset)

    return axios.post(cl_upload_url, formData, {
      headers: {"X-Requested-With": "XMLHttpRequest"},
      onUploadProgress: onUploadProgress
    })
  }
}