import { handleActions } from 'redux-actions'

import photosActions from './photos-actions'
import { assoc, findIndex, propEq, update } from "ramda"

export default handleActions({
  [photosActions.uploadToClRequest]: (state, action) => {
    return [{
      id: action.payload.id,
      image_url: action.payload.preview,
      uploading: true,
      progress: 0,
    }, ...state]
  },

  [photosActions.uploadToClProgress]: (state, action) => {
    const {id, progress} = action.payload
    const photoIdx = findIndex(propEq('id', id), state)
    const photo = assoc('progress', progress, state[photoIdx])
    return update(photoIdx, photo, state)
  },

  [photosActions.uploadToClSuccess]: (state, action) => {
    const photoIdx = findIndex(propEq('id', action.payload), state)
    const photo = assoc('uploading', false, state[photoIdx])
    return update(photoIdx, photo, state)
  },
  [photosActions.uploadPhotoSuccess]: (state, action) => {
    const {id, photo} = action.payload
    const photoIdx = findIndex(propEq('id', id), state)
    return update(photoIdx, photo, state)
  }
}, [])
