import React from 'react'
import './DesktopGalleryPreview.scss'

const DesktopGalleryPreview = ({intPoint}) => {

  let renderImage = (intPoint) => (
    <img src={intPoint.image_url} alt={intPoint.author}/>
  );

  let renderVideo = (intPoint) => (
    <video src={intPoint.video_url} type="video/mp4" poster={intPoint.image_url} autoPlay={true} controls={true}/>
  );

  let renderContent = (intPoint) => {
    switch (intPoint.kind) {
      case 'image':
        return renderImage(intPoint);
      case 'video':
        return renderVideo(intPoint);
      default:
        return renderImage(intPoint);
    }
  };

  return (
    <div className="DesktopGalleryPreview">
      { renderContent(intPoint) }
      <span>@{intPoint.author}</span>
    </div>
  )
};

export default DesktopGalleryPreview;