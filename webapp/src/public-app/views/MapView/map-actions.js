import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { mapActions } = createActions({
  MAP_ACTIONS: {
    ZOOM_IN: () => {},
    ZOOM_OUT: () => {},
    ZOOM_MAP: identity,

    MOVE_CENTER: identity,
    STOP_FOLLOW_TARGET: identity,
    START_FOLLOW_TARGET: identity,

    OPEN_GALLERY: identity
  },
})

export default mapActions
