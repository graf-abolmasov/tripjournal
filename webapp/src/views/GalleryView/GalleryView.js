import React from 'react'
import MobileGalleryView from './MobileGalleryView'
import DesktopGalleryView from './DesktopGallaryView'

import './GalleryView.scss'

export default () =>
  <div id="galleryContainer">
    {window.mobileDetect
      ? <MobileGalleryView/>
      : <DesktopGalleryView/>}
  </div>


