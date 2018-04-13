import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { ui } = createActions({
  UI: {
    INT_POINTS: {
      DETAILS: {
        SET_INT_POINT_ID: identity
      },
      LIST: {}
    }
  }
})

export default ui.intPoints


