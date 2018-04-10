import { handleActions } from 'redux-actions'

import Track from '../../../common/models/tracks/tracks'

export default handleActions({
  [Track.createRequest]: (state, action) => {
    return { uploading: true }
  },
  [Track.createSuccess]: (state, action) => {
    return { uploading: false }
  },
  [Track.createFailure]: (state, action) => {
    return { uploading: false }
  },
}, {
  uploading: false
})
