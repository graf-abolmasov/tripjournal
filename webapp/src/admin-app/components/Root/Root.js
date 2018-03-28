import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { history } from '../../store'

import UploadPhotoView from '../../views/photos/UploadPhotoView'

import 'reset-css';
import './Root.css'

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/admin/photos/upload" component={UploadPhotoView}/>
        {/*<Route path="/" component={() => window.location = '/'}/>*/}
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default Root