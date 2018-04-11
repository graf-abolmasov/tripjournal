import React from 'react'

import uiTracksActions from './ui-tracks-actions'
import connect from "react-redux/es/connect/connect"
import { find, propEq } from "ramda"

class TrackDetailsView extends React.Component {

  componentDidMount() {
    this.props.setTrackId(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.setTrackId(nextProps.match.params.id)
    }
  }

  renderEmptyMessage() {
    return (
      <p className="track-details__empty-help">
        No track selected
      </p>
    )
  }

  renderTrackInfo(track) {
    return (
      <p className="track-details__info">
        {JSON.stringify(track)}
      </p>
    )
  }

  render() {
    return (
      <div className="track-details">
        {this.props.track
          ? this.renderTrackInfo(this.props.track)
          : this.renderEmptyMessage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    track: find(propEq('id', state.ui.tracks.details.trackId), state.data.tracks) || {}
  }
}

export default connect(mapStateToProps, uiTracksActions.details)(TrackDetailsView)
