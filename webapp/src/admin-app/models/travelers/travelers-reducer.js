import { handleActions } from 'redux-actions'

import Traveler from './travelers'

export default handleActions({
  [Traveler.allSuccess]: (state, action) => {
    return action.payload
  },
}, [])
