import React from 'react'
import { connect } from 'react-redux'
import { identity } from "ramda"

import tripsActions from './trips-actions'

import './TripsView.scss'

class TripsView extends React.Component {

  componentDidMount() {
    this.props.loadTrips()
  }

  render() {
    return (
      <ul>
        {this.props.trips.map((trip) => (
          <li>{trip.custom_domain}</li>
        ))}
      </ul>
    )
  }
}

export default connect(identity, tripsActions)(TripsView)
