import React from 'react'
import { connect } from "react-redux"
import { identity, times } from "ramda"

import photosActions from '../../services/data/photos/photos-actions'
import travelersAction from '../../services/data/travelers/travelers-actions'

import Thumbnail from "../../components/photos/Thumbnail"
import PhotoUpload from "../../components/photos/PhotoUpload"

import './UploadPhotoView.sass'

class UploadPhotoView extends React.Component {

  componentDidMount() {
    this.props.allTravelersRequest()
  }

  uploadPhoto({traveler, file}) {
    this.props.uploadPhotoRequest({
      trip: this.props.trip,
      traveler: traveler,
      file: file,
    })
  }

  render() {
    return (
      <div className="upload-photos">
        <div className="upload-photos__photo-wrap">
          <PhotoUpload travelers={this.props.travelers} onSubmit={(e) => this.uploadPhoto(e)}/>
        </div>
        {this.props.photos.map((p) => (
          <div key={p.id} className="upload-photos__photo-wrap">
            <Thumbnail imageUrl={p.image_url}
                       uploading={p.uploading}
                       progress={p.progress}/>
          </div>
        ))}
        {times((idx) => (<div key={`-empty-pad${idx}`} className="upload-photos__photo-wrap -empty-pad"/>), 25)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trip: state.data.trip,
    photos: state.data.photos,
    travelers: state.data.travelers,
  }
}

export default connect(mapStateToProps, {...photosActions, ...travelersAction})(UploadPhotoView)
