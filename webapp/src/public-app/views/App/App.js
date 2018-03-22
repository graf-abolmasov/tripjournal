import React from 'react'
import { connect } from 'react-redux'
import { identity } from "ramda"
import screenfull from 'screenfull'
import appActions from "./app-actions"

import './App.scss'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showFullscreenButton: true
    }
  }

  componentDidMount() {
    this.props.start(this.props.trip)
    setTimeout(() => {
      this.setState({showFullscreenButton: false})
    }, 8000)
  }

  render() {
    const showFullscreenButton = this.state.showFullscreenButton
      && window.mobileDetect
      && screenfull.enabled
      && !this.props.isFullScreen
    return (
      <div id="appContainer">
        {showFullscreenButton ? (
          <div id="fullScreenBtnContainer">
            <span>Перейти в полный экран</span>
            <button onClick={this.props.requestFullScreen}>
              <i className="ion ion-android-expand"/>
            </button>
          </div>
        ) : null}
        {this.props.children}
      </div>
    )
  }
}

export default connect(identity, appActions)(App)
