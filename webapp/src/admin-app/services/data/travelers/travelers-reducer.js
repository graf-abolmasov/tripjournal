import { handleActions } from 'redux-actions'

import travelersActions from './travelers-actions'

export default handleActions({
  [travelersActions.allTravelersSuccess]: (state, action) => {
    return action.payload
  },
}, [])
