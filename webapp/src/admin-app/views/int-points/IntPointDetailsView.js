import React from 'react'

import intPointsActions from '../../../common/models/int-points/int-points'
import travelersActions from '../../models/travelers/travelers'
import uiIntPointsActions from './ui-int-points-actions'
import connect from "react-redux/es/connect/connect"
import { find, propEq } from "ramda"

class IntPointDetailsView extends React.Component {

  componentDidMount() {
    this.props.allTravelersRequest()
    this.props.setIntPointId(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.setIntPointId(this.props.match.params.id)
    }
  }

  renderEmptyMessage() {
    return (
      <p className="int-point-details__empty-help">
        No int points selected
      </p>
    )
  }

  renderTravelerSelector(intPoint, travelers) {
    return (
      <div className="form-group">
        <label htmlFor="intPointForm">Автор</label>
        <select id="intPointForm"
                className="form-control"
                value={intPoint.traveler_id}
                onChange={(e) => this.props.updateIntPointRequest({
                  id: intPoint.id,
                  traveler_id: e.target.value
                })}>
          {travelers.map((t) => (
            <option key={t.id} value={t.id}>{t.nickname}</option>
          ))}
        </select>
      </div>
    )
  }

  renderTripSelector(intPoint) {
    const trips = [
      { name: 'go2snow', id: 1 },
      { name: 'dekeo101', id: 12 },
      { name: 'eurotrip9999km', id: 11 }
    ]

    return (
      <div className="form-group">
        <label htmlFor="intPointForm">Поездка</label>
        <select id="intPointForm"
                className="form-control"
                value={intPoint.trip_id}
                onChange={(e) => this.props.updateIntPointRequest({
                  id: intPoint.id,
                  trip_id: e.target.value
                })}>
          {trips.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>
    )
  }

  renderIntPointInfo(intPoint, travelers) {
    return (
      <div className="int-point-details__info">
        <form className="int-point-details__int-point-form">
          {this.renderTravelerSelector(intPoint, travelers)}
          {this.renderTripSelector(intPoint)}
          <button className="btn btn-danger"
                  type="button"
                  onClick={() => this.props.destroyIntPointRequest(intPoint.id)}>
            Remove
          </button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="int-point-details">
        {this.props.intPoint
          ? this.renderIntPointInfo(this.props.intPoint, this.props.travelers)
          : this.renderEmptyMessage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    intPoint: find(propEq('id', state.ui.intPoints.details.intPointId), state.data.intPoints),
    travelers: state.data.travelers,
  }
}

const mapActionsToProps = {
  setIntPointId: uiIntPointsActions.details.setIntPointId,
  // allTripsRequest: tripsActions.allRequest,
  allTravelersRequest: travelersActions.allRequest,
  updateIntPointRequest: intPointsActions.updateRequest,
  destroyIntPointRequest: intPointsActions.destroyRequest
}

export default connect(mapStateToProps, mapActionsToProps)(IntPointDetailsView)
