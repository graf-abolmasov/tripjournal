import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { history } from '../../store'

import './Root.css'

import App from '../../views/App/App'
import MapView from '../../views/MapView/MapView'
import GalleryView from '../../views/GalleryView/GalleryView'

const mobileMediaQuery = window.matchMedia('(max-width: 750px)')
const onScreenMaxWidthChange = (mql) => {
  window.mobileDetect = mql.matches
}
onScreenMaxWidthChange(mobileMediaQuery)
mobileMediaQuery.addListener(onScreenMaxWidthChange)

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App>
          <Route path="/gallery" component={GalleryView}/>
          <Route exact path="/" component={MapView}/>
        </App>
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default Root