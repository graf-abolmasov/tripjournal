import React from 'react'
import { connect } from "react-redux"
import cn from 'classnames'

import trackActions from '../../../common/models/tracks/tracks'
import { NavLink, withRouter } from "react-router-dom"

import './TracksListView.sass'

class TracksListView extends React.Component {

  componentWillMount() {
    this.props.allTracksRequest()
  }

  render() {
    return (
      <div className="tracks-list">
        {this.props.tracks.map((t) => (
          <div className="tracks__list-item" key={t.id}>
            <NavLink to={`/admin/tracks/${t.id}`}
                     className={cn('btn btn-lg btn-block', {
                       'btn-outline-danger disabled': t.processing,
                       'btn-outline-dark': !t.processing,
                     })}>
              {t.id}
              {t.processing ? ' - processing' : null}
            </NavLink>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: state.data.tracks
  }
}

const mapActionsToProps = {
  allTracksRequest: () => trackActions.allRequest('json'),
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(TracksListView))
