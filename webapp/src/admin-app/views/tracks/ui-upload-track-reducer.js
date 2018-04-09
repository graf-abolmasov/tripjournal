import { handleActions } from 'redux-actions'

import Track from '../../models/tracks'

export default handleActions({
  [Track.uploadRequest]: (state, action) => {
    return { uploading: true }
  },
  [Track.uploadSuccess]: (state, action) => {
    return { uploading: false }
  },
}, {
  uploading: false
})
