import axios from 'axios'

function returnData(response) {
  return response.data
}

function throwError(error) {
  throw error
}

export const request = (options = {}) =>
  axios(options)
    .then(returnData)
    .catch(throwError)

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
