import React, { Fragment } from 'react'

import Header from "./Header"

class AppLayout extends React.Component {

  render() {
    return (
      <Fragment>
        <div className="app-content-wrapper">
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

export default AppLayout

