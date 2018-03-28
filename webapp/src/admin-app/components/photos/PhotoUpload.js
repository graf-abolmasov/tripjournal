import React from 'react'
import Dropzone from "react-dropzone"

import './PhotoUpload.sass'
import { find, findIndex, propEq } from "ramda"

class PhotoUpload extends React.Component {

  state = {
    travelerId: undefined
  }

  handleFilesDrop(files) {
    files.map((file) => {
      this.props.onSubmit({
        traveler: this.selectedTraveler(),
        file: file,
      })
    })
  }

  handleTravelerChange(e) {
    this.setState({travelerId: Number(e.target.value)})
  }

  selectedTraveler() {
    return find(propEq('id', this.state.travelerId), this.props.travelers) || this.props.travelers[0]
  }

  render() {
    return (
      <div className="photo-uploader">
        <form className="photo-uploader__form">
          <select onChange={(e) => this.handleTravelerChange(e)} className="photo-uploader__traveler-selector">
            {this.props.travelers.map((t) => (
              <option key={t.id} value={t.id}>{t.nickname}</option>
            ))}
          </select>
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




