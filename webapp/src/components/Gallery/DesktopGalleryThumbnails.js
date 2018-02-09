import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import 'jquery.scrollto'
import './DesktopGalleryThumbnails.scss'

class DesktopGalleryThumbnails extends React.Component {

  constructor(props) {
    super(props);
    this.scrollToSelectedImg = debounce((containerDomNode, selectedDomNode) => {
      jQuery(containerDomNode).scrollTo(selectedDomNode, 500, { offset: { left: -(containerDomNode.offsetWidth / 2) + (selectedDomNode.offsetWidth / 2) } });
    }, 400);
    this.keyPressing = throttle((newIndex) => {
      this.props.onIntPointSelect(newIndex)
    }, 100)
  }

  onKeyDown(e) {
    if (e.keyCode === 37) {
      e.preventDefault();
      this.keyPressing(this.props.selectedIndex - 1)
    } else if (e.keyCode === 39) {
      e.preventDefault();
      this.keyPressing(this.props.selectedIndex + 1)
    }
  }

  render() {
    return (
      <div className="DesktopGalleryThumbnails">
        <div className="previews" ref="previewsContainer">
          { this.props.intPoints.map((intPoint, index) => {
            const isSelected = this.props.selectedIndex === index;
            let props = {
              key: intPoint.id,
              src: intPoint.image_url,
              tabIndex: index,
              className: classNames("preview", { selected: isSelected, video: intPoint.kind === 'video' }),
              onClick: (e) => this.props.onIntPointSelect(index),
              onKeyDown: (e) => this.onKeyDown(e)
            };

            if (isSelected) {
              props.ref = 'activeItem'
            }

            return (
              <img {...props} alt={intPoint.author}/>
            )
          })}
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.selectedIndex !== undefined) {
      this.ensureActiveItemVisible();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedIndex !== prevProps.selectedIndex) {
      this.ensureActiveItemVisible();
    }
  }

  ensureActiveItemVisible() {
    let activeItemRef = this.refs.activeItem;
    if (activeItemRef) {
      let domNode = ReactDOM.findDOMNode(activeItemRef);
      let containerDomNode = ReactDOM.findDOMNode(this.refs.previewsContainer);
      this.scrollToSelectedImg(containerDomNode, domNode);
      domNode.focus();
    }
  }
}

export default DesktopGalleryThumbnails;