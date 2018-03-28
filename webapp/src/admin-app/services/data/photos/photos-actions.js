import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const {data} = createActions({
  DATA: {
    ALL_PHOTOS_REQUEST: identity,
    ALL_PHOTOS_SUCCESS: identity,

    UPLOAD_PHOTO_REQUEST: identity,
    UPLOAD_PHOTO_SUCCESS: identity,

    //direct upload to storage
    UPLOAD_TO_CL_REQUEST: identity,
    UPLOAD_TO_CL_PROGRESS: identity,
    UPLOAD_TO_CL_SUCCESS: identity,
    UPLOAD_TO_CL_FAILURE: identity,
  }
})

export default data


