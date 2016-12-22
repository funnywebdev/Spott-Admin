import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import colors from '../colors';
import NonKeyFramesHider from './nonKeyFramesHider';

const crossLarge = require('./images/crossLarge.svg');
const arrow = require('../sceneEditor/images/arrow.svg');

@Radium
export default class LargeFrameModal extends Component {

  static propTypes = {
    currentFrame: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelectLeftScene: PropTypes.func.isRequired,
    onSelectRightScene: PropTypes.func.isRequired,
    onToggleVisibilityScene: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  onClose (e) {
    e.preventDefault();
    this.props.onClose();
  }

  static styles = {
    overlay: {
      backgroundColor: 'rgba(28, 28, 28, 0.9)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000
    },
    content: {
      position: 'absolute',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      width: '60%',
      top: '50%',
      left: '50%',
      right: 'auto',
      // Fit height to content, centering vertically
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    },
    close: {
      position: 'fixed',
      top: '3em',
      right: '3em'
    },
    image: {
      width: '100%'
    },
    framesHider: {
      display: 'inline-block',
      marginTop: '0.875em'
    },
    imageContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      padding: '2em'
    },
    left: {
      paddingRight: '1.25em'
    },
    right: {
      paddingLeft: '1.25em'
    },
    arrowLeft: {
      transform: 'rotate(180deg)'
    },
    imageWrapper: {
      base: {
        lineHeight: 0,
        position: 'relative'
      },
      active: {
        border: `1px solid ${colors.vividOrange}`
      }
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { currentFrame, isOpen, onSelectLeftScene, onSelectRightScene, onToggleVisibilityScene } = this.props;

    if (isOpen && currentFrame) {
      return (
        <div style={styles.overlay} onClick={this.onClose}>
          <button style={styles.close} onClick={this.onClose}>
            <img src={crossLarge} title='Close' />
          </button>
          <div style={styles.content} onClick={(e) => e.stopPropagation()}>
            <div style={styles.imageContainer}>
              <button style={styles.left} onClick={onSelectLeftScene}>
                <img src={arrow} style={styles.arrowLeft} title='Previous frame' />
              </button>
              <div style={[ styles.imageWrapper.base, currentFrame.get('hidden') && styles.imageWrapper.active ]}>
                <img src={`${currentFrame.get('imageUrl')}?height=699&width=1242`} style={styles.image} />
              </div>

              <button style={styles.right} onClick={onSelectRightScene}>
                <img src={arrow} title='Next frame' />
              </button>
            </div>
            <div style={styles.framesHider}>
              <NonKeyFramesHider
                isHidden={currentFrame.get('hidden')}
                single
                onToggleHidden={onToggleVisibilityScene}/>
            </div>
          </div>
        </div>
      );
    }
    return <span />;
  }
}
