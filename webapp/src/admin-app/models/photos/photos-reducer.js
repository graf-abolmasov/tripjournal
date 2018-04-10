import { handleActions } from 'redux-actions'
import { assoc, filter, findIndex, propEq, update } from "ramda"

import Photo from './photos'

export default handleActions({
  [Photo.allSuccess]: (state, action) => {
    const uploadingPhotos = filter(propEq('uploading', true), state)
    return [...uploadingPhotos, ...action.payload]
  },
  [Photo.uploadToClRequest]: (state, action) => {
    return [{
      id: action.payload.id,
      thumb_url: action.payload.preview,
      uploading: true,
      progress: 0,
    }, ...state]
  },
  [Photo.uploadToClProgress]: (state, action) => {
    const {id, progress} = action.payload
    const photoIdx = findIndex(propEq('id', id), state)
    const photo = assoc('progress', progress, state[photoIdx])
    return update(photoIdx, photo, state)
  },
  [Photo.uploadToClSuccess]: (state, action) => {
    const photoIdx = findIndex(propEq('id', action.payload), state)
    const photo = assoc('uploading', false, state[photoIdx])
    return update(photoIdx, photo, state)
  },
  [Photo.uploadSuccess]: (state, action) => {
    const {id, photo} = action.payload
    const photoIdx = findIndex(propEq('id', id), state)
    return update(photoIdx, photo, state)
  }
}, [])
