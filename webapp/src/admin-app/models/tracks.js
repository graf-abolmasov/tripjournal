import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { post } from '../../common/api'

export const actions = createActions({
  DATA: {
    TRACKS: {
      UPLOAD_REQUEST: identity,
      UPLOAD_SUCCESS: identity,
    }
  }
})

export const api = {
  create: (track) => post('/api/tracks.json', track),
}

export default {
  ...api,
  ...actions.data.tracks
}
