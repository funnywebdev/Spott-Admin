import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { fontWeights, makeTextStyle, mediaQueries } from '../_common/styles';
import Spinner from '../_common/components/spinner';

export const smallWidgetStyle = {
  width: '100%',
  marginBottom: '1.75em',
  paddingLeft: '0.75em',
  paddingRight: '0.75em',
  [mediaQueries.medium]: {
    display: 'inline-block',
    width: '50%'
  },
  [mediaQueries.large]: {
    width: '33.333333%'
  }
};

export const mediumWidgetStyle = {
  width: '100%',
  marginBottom: '1.75em',
  paddingLeft: '0.75em',
  paddingRight: '0.75em',
  [mediaQueries.medium]: {
    display: 'inline-block',
    width: '50%'
  },
  [mediaQueries.large]: {
    width: '50%'
  }
};

export const largeWidgetStyle = {
  width: '100%',
  marginBottom: '1.75em',
  paddingLeft: 0,
  paddingRight: 0,
  [mediaQueries.medium]: {
    display: 'block',
    width: '100%'
  },
  [mediaQueries.large]: {
    width: '100%'
  }
};

@Radium
export default class Widget extends Component {

  static propTypes = {
    children: PropTypes.node,
    contentStyle: PropTypes.object,
    header: PropTypes.node,
    isLoading: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string
  };

  static styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: 2,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#ced6da'
    },
    content: {
      paddingTop: '2em',
      paddingBottom: '2em',
      paddingLeft: '1.5em',
      paddingRight: '1.5em'
    },
    header: {
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      height: '2em',
      paddingLeft: '1em',
      paddingRight: '10px',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#ced6da'
    },
    title: {
      ...makeTextStyle(fontWeights.regular, '0.688em', '0.0455em'),
      color: '#6d8791',
      fontWeight: 'normal',
      textTransform: 'uppercase'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { children, contentStyle, header, isLoading, style, title } = this.props;
    return (
      <div style={[ smallWidgetStyle, style ]}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h2 style={styles.title}>{title}&nbsp;&nbsp;&nbsp;</h2>
            {isLoading && <Spinner size='small' />}
            {header}
          </div>
          <div style={[ styles.content, contentStyle ]}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
