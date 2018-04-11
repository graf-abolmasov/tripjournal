import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store, { history } from './store'
import PhotosView from './views/photos/PhotosView'
import TracksView from "./views/tracks/TracksView"
import AppLayout from './views/AppLayout/AppLayout'

import 'reset-css'
import 'bootstrap/dist/css/bootstrap.css';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/admin/photos" component={PhotosView}/>
          <Route path="/admin/tracks" component={TracksView}/>
          <Redirect to="/admin/photos"/>
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  </Provider>
)

export default Root