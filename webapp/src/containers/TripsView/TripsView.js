import React from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';

const TripView = ({ params }) => {
  return (
    <div>
      <h1>It Works!</h1>
      <IndexLink to="/">Go Home</IndexLink>
    </div>
  )
};

export default connect()(TripView)
