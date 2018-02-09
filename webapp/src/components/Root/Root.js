import React from 'react';
import {
  Route,
} from 'react-router-dom'
import App from '../../containers/App/App'
import MapView from '../../containers/MapView/MapView'
import GalleryView from '../../containers/GalleryView/GalleryView'

const Root = () => (
  <App>
    <Route exact path="/" component={MapView}/>
    <Route path="/gallery" component={GalleryView}/>
  </App>
);

export default Root