import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'
import App from '../../containers/App/App'
import MapView from '../../containers/MapView/MapView'
import GalleryView from '../../containers/GalleryView/GalleryView'

const Root = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={MapView}/>
      <Route path="/gallery" component={GalleryView}/>
    </Route>
  </Router>
);

export default Root