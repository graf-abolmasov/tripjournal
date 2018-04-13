import React, { Fragment } from 'react'
import { connect } from "react-redux"

import { NavLink, withRouter } from "react-router-dom"

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">&larr; К карте</a>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/int-points">Посты</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/photos">Фото</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/tracks">Трэки</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => (
  { traveler: state.data.traveler }
)

export default withRouter(connect(mapStateToProps)(Header))