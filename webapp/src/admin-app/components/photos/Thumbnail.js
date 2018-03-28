import React from 'react'
import cn from 'classnames'

import './Thumbnail.sass'

const Thumbnail = ({imageUrl, uploading, progress}) => {
  return (
    <div className="thumbnail">
      <img src={imageUrl} className={cn("thumbnail__image", {"-uploading": uploading})}/>
      {uploading
        ? <progress value={progress} max={100} className="thumbnail__progress"/>
        : null}
    </div>
  )
}

export default Thumbnail
