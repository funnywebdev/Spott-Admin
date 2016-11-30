import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { fontWeights, makeTextStyle, colors } from '../../_common/styles';
import ArrowSVG from '../images/arrow';

/* eslint-disable react/no-set-state */

export const styles = {
  root: {
    position: 'relative',
    ...makeTextStyle(fontWeights.regular, '11px', '0.3px')
  },
  // same as floatOptions, but sticked to the dropdown
  menu: {
    position: 'absolute',
    backgroundColor: colors.white,
    right: 0,
    minWidth: '100px',
    zIndex: 9
  },
  // Option sticked to the dropdown
  option: {
    position: 'relative',
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.lightGray2}`,
    borderLeft: `1px solid ${colors.lightGray2}`,
    borderRight: `1px solid ${colors.lightGray2}`,
    borderBottom: `1px solid ${colors.lightGray2}`,
    color: colors.darkGray2,
    paddingRight: '12px',
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '10px',
    cursor: 'pointer',
    ':hover': {
      zIndex: 10,
      borderTop: `1px solid ${colors.lightGray3}`,
      borderLeft: `1px solid ${colors.lightGray3}`,
      borderRight: `1px solid ${colors.lightGray3}`,
      borderBottom: `1px solid ${colors.lightGray3}`
    },
    ':active': {
      backgroundColor: colors.veryLightGray
    }
  },
  clickable: {
    cursor: 'pointer'
  },
  // same as option, but without padding
  control: {
    position: 'relative',
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.lightGray2}`,
    borderLeft: `1px solid ${colors.lightGray2}`,
    borderRight: `1px solid ${colors.lightGray2}`,
    borderBottom: `1px solid ${colors.lightGray2}`,
    color: colors.darkGray2,
    zIndex: 0,
    ':hover': {
      zIndex: 10,
      borderTop: `1px solid ${colors.lightGray3}`,
      borderLeft: `1px solid ${colors.lightGray3}`,
      borderRight: `1px solid ${colors.lightGray3}`,
      borderBottom: `1px solid ${colors.lightGray3}`
    },
    ':active': {
      backgroundColor: colors.veryLightGray
    }
  },
  // radius of left border
  borderLeft: {
    borderTopLeftRadius: '2px',
    borderBottomLeftRadius: '2px'
  },
  // radius of right border
  borderRight: {
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  // higher zIndex, for the seperator feeling
  borderRightSeperator: {
    zIndex: 11,
    borderRight: `1px solid ${colors.white}`,
    ':hover': {
      zIndex: 11,
      borderRight: `1px solid ${colors.white}`
    }
  },
  arrowUnder: { transform: 'rotateZ(180deg)' },
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
    minHeight: '20px'
  },
  elementShown: {
    marginRight: '-1px'
  },
  marginTop: {
    marginTop: '-1px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  blue: {
    backgroundColor: colors.primaryBlue,
    borderTop: `1px solid ${colors.primaryBlue}`,
    borderLeft: `1px solid ${colors.primaryBlue}`,
    borderRight: `1px solid ${colors.primaryBlue}`,
    borderBottom: `1px solid ${colors.primaryBlue}`,
    color: colors.white,
    ':hover': {
      zIndex: 10,
      backgroundColor: colors.blue,
      borderTop: `1px solid ${colors.blue}`,
      borderLeft: `1px solid ${colors.blue}`,
      borderRight: `1px solid ${colors.blue}`,
      borderBottom: `1px solid ${colors.blue}`
    },
    ':active': {
      backgroundColor: colors.blue
    }
  },
  bigOption: {
    paddingRight: '12px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '10px',
    ...makeTextStyle(fontWeights.medium, '12px')
  },
  bigArrowContainer: {
    minWidth: '30px',
    minHeight: '30px'
  },
  // floatOptions and floatOption is the same as in selectionDropdown.
  // The idea is that we have options sticked to the dropdown and options
  // that are floated from the dropdown.
  floatOption: {
    color: colors.black2,
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '10px',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    ':hover': {
      backgroundColor: colors.lightGray4
    },
    cursor: 'pointer'
  },
  floatOptions: {
    zIndex: 10,
    position: 'absolute',
    right: 0,
    top: 40,
    minWidth: '180px',
    borderRadius: '2px',
    backgroundColor: colors.white,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: `solid 1px ${colors.lightGray2}`
  }
};

@Radium
class Dropdown extends Component {

  static propTypes = {
    arrowStyle: PropTypes.object,
    children: PropTypes.node,
    color: PropTypes.string,
    elementShown: PropTypes.node,
    floatedDropdown: PropTypes.bool,
    style: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  toggleOpen () {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleMouseDown (event) {
    if (event.type === 'mousedown' && event.button !== 0) { return; }
    event.stopPropagation();
    event.preventDefault();

    this.toggleOpen();
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false });
      }
    }
  }

  render () {
    const { color, children, elementShown, style, arrowStyle, floatedDropdown } = this.props;

    return (
      <div key='dropdown' style={[ styles.root, style ]}>
        <div style={styles.row}>
          {elementShown && <div style={[ styles.elementShown ]}>
            {elementShown}
          </div>}
          <div
            key='arrow'
            style={[
              styles.borderRight,
              !elementShown && styles.borderLeft,
              styles.control,
              styles.arrowContainer,
              styles.clickable, color === 'blue' && styles.blue,
              arrowStyle
            ]}
            // we need to stop the propagation, cause in components like Tile, we do not want
            // to trigger multiple onClick events. Dropdown has priority.
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onMouseDown={this.handleMouseDown.bind(this)}>
            <ArrowSVG color={color === 'blue' && colors.white || colors.darkGray2} style={[ !this.state.isOpen && styles.arrowUnder ]} />
          </div>
        </div>
        {/* menu */}
        { this.state.isOpen &&
          <div style={[ !floatedDropdown && styles.menu ]} onClick={this.toggleOpen}>{children}</div>
        }
      </div>
    );
  }

}

export default Dropdown;