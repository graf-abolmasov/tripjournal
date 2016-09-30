import React from 'react';
import { Router, Route } from 'react-router'
import MapView from '../../containers/MapView/MapView'
import TripsView from '../../containers/TripsView/TripsView'

const Root = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={MapView}/>
    <Route path="/trips" component={TripsView}/>
  </Router>
);

export default Root