import React from 'react'
import { connect } from "react-redux"
import Dropzone from "react-dropzone"

import trackActions from '../../../common/models/tracks/tracks'

import './UploadTrackView.sass'

class UploadTrackView extends React.Component {

  constructor(props) {
    super(props)

    this.handleFilesDrop = this.handleFilesDrop.bind(this)
  }

  componentWillMount() {
    this.props.allTracksRequest()
  }

  handleFilesDrop(files) {
    files.forEach((file) => {
      this.props.uploadTrackRequest({
        file: file,
      })
    })
  }

  render() {
    return (
      <div className="upload-track">
        <form className="upload-track__form">
          <Dropzone onDrop={this.handleFilesDrop}
                    multiple={true}
                    disabled={this.props.uploading}
                    maxSize={5*1024*1024 /*5Mb*/}
                    className="upload-track__dropzone">
            <span className="upload-track__help-text">
              {this.props.uploading ? 'Uploading...' : 'Drop your files or click here to upload'}
              <br/>
              <br/>
              Files over 150Kb will be processed asynchronously
            </span>
          </Dropzone>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uploading: state.ui.tracks.uploading
  }
}

const mapActionsToProps = {
  uploadTrackRequest: trackActions.createRequest,
  allTracksRequest: trackActions.allRequest,
}

export default connect(mapStateToProps, mapActionsToProps)(UploadTrackView)
