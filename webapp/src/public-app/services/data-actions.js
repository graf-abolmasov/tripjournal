import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { data } = createActions({
  DATA: {
    MOVE_HOT_POINT: identity,

    HOT_TRACK_LOAD: identity,
    HOT_TRACK_LOADED: identity,

    TRACKS_LOAD: identity,
    TRACKS_LOADED: identity,

    INT_POINTS_LOAD: identity,
    INT_POINTS_LOADED: identity,
  }
})

export default data


