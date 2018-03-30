import React from 'react'
import { connect } from "react-redux"
import { identity, times } from "ramda"

import photoActions from '../../models/photos'
import travelerActions from '../../models/travelers'

import Thumbnail from "../../components/photos/Thumbnail"
import PhotoUpload from "../../components/photos/PhotoUpload"

import './PhotosView.sass'

class PhotosView extends React.Component {

  componentDidMount() {
    this.props.allTravelersRequest()
    if (this.props.match.path === '/admin/photos') {
      this.props.allPhotosRequest()
    }
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
            <Thumbnail imageUrl={p.thumb_url}
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

const mapActionsToProps = {
  uploadPhotoRequest: photoActions.uploadRequest,
  allPhotosRequest: photoActions.allRequest,
  allTravelersRequest: travelerActions.allRequest
}

export default connect(mapStateToProps, mapActionsToProps)(PhotosView)
