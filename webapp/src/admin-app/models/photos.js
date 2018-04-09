import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { get, post } from '../../common/api'

export const actions = createActions({
  DATA: {
    PHOTOS: {
      ALL_REQUEST: identity,
      ALL_SUCCESS: identity,

      UPLOAD_REQUEST: identity,
      UPLOAD_SUCCESS: identity,

      //direct upload to storage
      UPLOAD_TO_CL_REQUEST: identity,
      UPLOAD_TO_CL_PROGRESS: identity,
      UPLOAD_TO_CL_SUCCESS: identity,
      UPLOAD_TO_CL_FAILURE: identity,
    }
  }
})

export const api = {
  create: (photo) => post('/api/photo_sources/create_with_int_point.json', photo),
  all: () => get('/api/photo_sources.json')
}

export default {
  ...api,
  ...actions.data.photos
}
