import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { post, get } from '../../api'

export const actions = createActions({
  DATA: {
    TRACKS: {
      ALL_REQUEST: identity,
      ALL_SUCCESS: identity,

      CREATE_REQUEST: identity,
      CREATE_SUCCESS: identity,
      CREATE_FAILURE: identity,

      //direct upload to storage
      UPLOAD_TO_CL_REQUEST: identity,
      UPLOAD_TO_CL_PROGRESS: identity,
      UPLOAD_TO_CL_SUCCESS: identity,
      UPLOAD_TO_CL_FAILURE: identity,
    }
  }
})

export const api = {
  create: (track) => post('/api/tracks.json', track),
  all: (format = 'json') => get(`/api/tracks.${format || 'json'}`),
}

export default {
  ...api,
  ...actions.data.tracks
}
