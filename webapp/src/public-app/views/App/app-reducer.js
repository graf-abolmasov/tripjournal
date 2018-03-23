import { handleActions } from 'redux-actions'

import appActions from './app-actions'

export default handleActions({
  [appActions.requestFullScreen]: (state) =>
    ({...state, isFullScreen: true}),
}, {
  isFullScreen: false
})
