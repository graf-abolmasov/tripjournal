import { createActions } from 'redux-actions'
import { identity } from 'ramda'
import { get } from '../../../common/api'

export const actions = createActions({
  DATA: {
    HOT_POINTS: {
      ALL_REQUEST: identity,
      ALL_SUCCESS: identity,

      APPEND: identity,
    }
  }
})

export const api = {
  all: () => get('/api/hot_points.json'),
}

export default {
  ...api,
  ...actions.data.hotPoints
}
