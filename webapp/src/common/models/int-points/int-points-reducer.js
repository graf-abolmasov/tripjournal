import { handleActions } from "redux-actions"

import IntPoint from './int-points'

export default handleActions({
  [IntPoint.allSuccess]: (state, action) =>
    (action.payload),
}, [])
