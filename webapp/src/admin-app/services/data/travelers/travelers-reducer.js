import { handleActions } from 'redux-actions'

import Traveler from '../../../models/travelers'

export default handleActions({
  [Traveler.allSuccess]: (state, action) => {
    return action.payload
  },
}, [])
