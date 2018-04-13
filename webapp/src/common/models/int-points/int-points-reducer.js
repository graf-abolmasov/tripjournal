import { handleActions } from "redux-actions"

import IntPoint from './int-points'
import { findIndex, propEq, reject, update, } from "ramda"

export default handleActions({
  [IntPoint.allSuccess]: (state, action) =>
    (action.payload),
  [IntPoint.updateSuccess]: (state, action) => {
    const intPoint = action.payload
    const idx = findIndex(propEq('id', intPoint.id), state)
    return update(idx, intPoint, state)
  },
  [IntPoint.destroySuccess]: (state, action) =>
    reject(propEq('id', action.payload), state)
}, [])
