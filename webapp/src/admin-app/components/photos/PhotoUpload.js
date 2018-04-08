import React from 'react'
import Dropzone from "react-dropzone"

import './PhotoUpload.sass'

class PhotoUpload extends React.Component {

  handleFilesDrop(files) {
    files.map((file) => {
      this.props.onSubmit({
        file: file,
      })
    })
  }

  render() {
    return (
      <div className="photo-uploader">
        <form className="photo-uploader__form">
          <Dropzone onDrop={(files) => this.handleFilesDrop(files)} multiple accept="image/*"
                    className="photo-uploader__dropzone">
            <p className="photo-uploader__help-text">
              Drop your files or click here to upload
            </p>
          </Dropzone>
        </form>
      </div>
    )
  }
}

export default PhotoUpload




