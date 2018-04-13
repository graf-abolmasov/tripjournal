import React from 'react'

import IntPointsListView from './IntPointsListView'
import IntPointDetailsView from './IntPointDetailsView'

import './IntPointsView.sass'
import { Route } from "react-router-dom"

export default () => (
  <div className="int-points">
    <div className="int-points__panel -left">
      <IntPointsListView/>
    </div>
    <div className="int-points__panel -right">
      <Route component={IntPointDetailsView} path="/admin/int-points/:id"/>
    </div>
  </div>
)

