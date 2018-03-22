import React from 'react';
import './MapControls.scss'

const MapControls = ({ followTarget, zoom, minZoom, maxZoom, onFollowClick, onZoomInClick, onZoomOutClick }) => (
  <div className="MapControls">
    { !followTarget ? (
      <div className="followTarget">
        <button id="followTargetBtn" className="ion ion-android-locate"
                onClick={(e) => onFollowClick(e)}/>
      </div>
    ) : null}
    <div className="zoom">
      <button className="zoomIn ion ion-plus-round"
              disabled={zoom >= maxZoom}
              onClick={(e) => onZoomInClick(e)}/>
      <button id="zoomOut" className="ion ion-minus-round"
              disabled={zoom <= minZoom}
              onClick={(e) => onZoomOutClick(e)}/>
    </div>
  </div>
);

export default MapControls;