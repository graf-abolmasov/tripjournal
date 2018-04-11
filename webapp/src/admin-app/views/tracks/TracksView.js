import React from 'react'

import UploadTrackView from "./UploadTrackView"
import TracksListView from "./TracksListView"
import TrackDetailsView from "./TrackDetailsView"
import { Route } from "react-router-dom"

import './TracksView.sass'

class TracksView extends React.Component {

  render() {
    return (
      <div className="tracks">
        <div className="tracks__panel -left">
          <div className="tracks__upload-wrapper">
            <UploadTrackView/>
          </div>
          <div className="tracks__list-wrapper">
            <TracksListView/>
          </div>
        </div>
        <div className="tracks__panel -right">
          <Route component={TrackDetailsView} path="/admin/tracks/:id"/>
        </div>
      </div>
    )
  }
}

export default TracksView
