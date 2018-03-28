import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const {data} = createActions({
  DATA: {
    ALL_TRAVELERS_REQUEST: identity,
    ALL_TRAVELERS_SUCCESS: identity,
  }
})

export default data


