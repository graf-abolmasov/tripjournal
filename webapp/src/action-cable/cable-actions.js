import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const actions = createActions({
  CABLE_ACTIONS: {
    DATA_RECEIVED: identity,
    CONNECT_TO: identity,
    TERMINATE: () => {},
  },
})

export default actions.cableActions
