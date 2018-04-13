import React from 'react'
import { connect } from "react-redux"
import cn from 'classnames'

import intPointsActions from '../../../common/models/int-points/int-points'
import { NavLink, withRouter } from "react-router-dom"

import './IntPointsListView.sass'

class IntPointsListView extends React.Component {

  componentWillMount() {
    this.props.allIntPointsRequest()
  }

  render() {
    return (
      <div className="int-points-list">
        {this.props.intPoints.map((ip) => (
          <NavLink key={ip.id}
                   to={`/admin/int-points/${ip.id}`}
                   className={cn('btn btn-lg btn-block int-points__list-item', {
                     'btn-outline-danger disabled': ip.processing,
                     'btn-outline-dark': !ip.processing,
                   })}>
            <img className="int-points__list-item__thumb" src={ip.image_thumb_url}/>
            <div className="int-points__list-item__info">
              <span><b>id</b>  {ip.id}</span>
              <span><b>by</b> {ip.author}</span>
              <span><b>in</b> {ip.trip}</span>
              <span><b>lat</b> {ip.lat}</span>
              <span><b>lng</b> {ip.lng}</span>
            </div>
          </NavLink>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    intPoints: state.data.intPoints
  }
}

const mapActionsToProps = {
  allIntPointsRequest: intPointsActions.allRequest,
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(IntPointsListView))
