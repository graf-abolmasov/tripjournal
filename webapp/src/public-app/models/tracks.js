import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { get } from '../../common/api'

export const actions = createActions({
  DATA: {
    TRACKS: {
      ALL_REQUEST: identity,
      ALL_SUCCESS: identity,
    }
  }
})

export const api = {
  all: () => get('/api/tracks.json'),
}

export default {
  ...api,
  ...actions.data.tracks
}
