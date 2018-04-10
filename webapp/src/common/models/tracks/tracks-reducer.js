import { handleActions } from 'redux-actions'

import Track from '../../../common/models/tracks/tracks'
import { assoc, filter, findIndex, propEq, remove, update } from "ramda"

export default handleActions({
  [Track.allSuccess]: (state, action) => {
    const uploadingTracks = filter(propEq('uploading', true), state)
    return [...uploadingTracks, ...action.payload]
  },
  [Track.uploadToClRequest]: (state, action) => {
    return [{
      id: action.payload.id,
      uploading: true,
      progress: 0,
    }, ...state]
  },
  [Track.uploadToClProgress]: (state, action) => {
    const {id, progress} = action.payload
    const trackIdx = findIndex(propEq('id', id), state)
    const track = assoc('progress', progress, state[trackIdx])
    return update(trackIdx, track, state)
  },
  [Track.uploadToClSuccess]: (state, action) => {
    const trackIdx = findIndex(propEq('id', action.payload), state)
    const track = assoc('uploading', false, state[trackIdx])
    return update(trackIdx, track, state)
  },
  [Track.uloadToClFailure]: (state, action) => {
    const { id } = action.payload
    const trackIdx = findIndex(propEq('id', id), state)
    return trackIdx === -1 ? remove(trackIdx, 1, state) : state
  },
  [Track.createSuccess]: (state, action) => {
    const {id, tracks} = action.payload
    const trackIdx = findIndex(propEq('id', id), state)
    if (trackIdx === -1) {
      return [...tracks, ...state]
    } else {
      return [...tracks, remove(trackIdx, 1, state)]
    }
  },
  [Track.createFailure]: (state, action) => {
    const { id } = action.payload
    const trackIdx = findIndex(propEq('id', id), state)
    return trackIdx === -1 ? remove(trackIdx, 1, state) : state
  }
}, [])
