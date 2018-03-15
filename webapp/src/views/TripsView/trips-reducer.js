import { handleActions } from 'redux-actions'

import tripsActions from './trips-actions'

export default handleActions({
  [tripsActions.tripsLoaded]: (state, action) =>
    ({...state, trips: action.payload, ajax: {...state.ajax, trips: true}}),
}, {})