import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { ui } = createActions({
  UI: {
    TRACKS: {
      DETAILS: {
        SET_TRACK_ID: identity
      },
      LIST: {}
    }
  }
})

export default ui.tracks


