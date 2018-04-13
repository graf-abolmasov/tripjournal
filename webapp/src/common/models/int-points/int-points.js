import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { get, destroy, put } from '../../api'

export const actions = createActions({
  DATA: {
    INT_POINTS: {
      ALL_REQUEST: identity,
      ALL_SUCCESS: identity,

      DESTROY_REQUEST: identity,
      DESTROY_SUCCESS: identity,

      UPDATE_REQUEST: identity,
      UPDATE_SUCCESS: identity,

      APPEND: identity,
    }
  }
})

export const api = {
  all: () => get('/api/int_points.json'),
  update: (intPoint) => put(`/api/int_points/${intPoint.id}.json`, intPoint),
  destroy: (id) => destroy(`/api/int_points/${id}.json`)
}

export default {
  ...api,
  ...actions.data.intPoints
}
