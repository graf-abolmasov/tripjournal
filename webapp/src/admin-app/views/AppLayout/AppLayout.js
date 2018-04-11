import React, { Fragment } from 'react'

import Header from "./Header"

import './AppLayout.sass'

class AppLayout extends React.Component {

  render() {
    return (
      <div className="app">
        <div className="app__header-wrapper">
          <Header/>
        </div>
        <div className="app__content-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AppLayout

