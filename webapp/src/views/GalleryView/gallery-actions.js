import { createActions } from 'redux-actions'
import { identity } from 'ramda'

const { galleryActions } = createActions({
  GALLERY_ACTIONS: {
    SET_SELECTED_INDEX: identity,
  },
})

export default galleryActions
