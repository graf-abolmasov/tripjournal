import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { history } from '../../store'

import './Root.css'

import App from '../../containers/App/App'
import MapView from '../../containers/MapView/MapView'
import GalleryView from '../../containers/GalleryView/GalleryView'

const mobileMediaQuery = window.matchMedia('(max-width: 750px)')
const onScreenMaxWidthChange = (mql) => {
  window.mobileDetect = mql.matches
}
onScreenMaxWidthChange(mobileMediaQuery)
mobileMediaQuery.addListener(onScreenMaxWidthChange)

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={MapView}/>
        <Route path="/gallery" component={GalleryView}/>
      </App>
    </ConnectedRouter>
  </Provider>
)

export default Root