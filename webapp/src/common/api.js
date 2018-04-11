import axios from 'axios'

const CSRF_TOKEN = document
  .querySelector('meta[name=csrf-token]')
  .getAttribute('content')

const TIMEOUT_MS = 60000

axios.defaults.timeout = TIMEOUT_MS
axios.defaults.headers.common = {
  'X-CSRF-TOKEN': CSRF_TOKEN,
}

export const get = (url, options = {}) =>
  request({
    method: 'get',
    url: url,
    ...options
  })

export const post = (url, data, options = {}) =>
  request({
    method: 'post',
    url: url,
    data: data,
    ...options
  })

function returnData(response) {
  return response.data
}

function throwError(error) {
  throw error
}

function request(options = {}) {
  return axios(options)
    .then(returnData)
    .catch(throwError)
}

