import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { trips } = createActions({
  TRIPS: {
    LOAD_TRIPS: identity,
    TRIPS_LOADED: identity,
  }
})

export default trips


