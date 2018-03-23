import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { app } = createActions({
  APP: {
    START: identity,

    REQUEST_FULL_SCREEN: identity
  }
})

export default app


