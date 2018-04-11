import React from 'react'
import cn from 'classnames'

import './Thumbnail.sass'

const Thumbnail = ({imageUrl, uploading, progress}) => {
  const renderProgressBar = (progress) => (
    <div className="progress thumbnail__progress">
      <div className="progress-bar"
           role="progressbar"
           style={{width: `${progress}%`}}
           aria-valuenow={progress}
           aria-valuemin="0"
           aria-valuemax="100">
        {progress}%
      </div>
    </div>
  )

  return (
    <div className="thumbnail">
      <img src={imageUrl} className={cn("thumbnail__image", {"-uploading": uploading})}/>
      {uploading
        ? renderProgressBar(progress)
        : null}
    </div>
  )
}

export default Thumbnail
