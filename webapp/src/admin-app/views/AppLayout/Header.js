import React, { Fragment } from 'react'
import { connect } from "react-redux"

import './Header.sass'

const Header = (props) => (
  <div className="header">
    Header
  </div>
)

const mapStateToProps = (state) => (
  {traveler: state.data.traveler}
)

export default connect(mapStateToProps)(Header)