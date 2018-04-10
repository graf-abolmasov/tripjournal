import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { get } from '../../api'

export const actions = createActions({
  DATA: {
    INT_POINTS: {
      ALL_REQUEST: identity,
      ALL_SUCCESS: identity,

      APPEND: identity,
    }
  }
})

export const api = {
  all: () => get('/api/int_points.json'),
}

export default {
  ...api,
  ...actions.data.intPoints
}
