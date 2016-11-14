import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

export function renderSVG (fill = '#17262b', style) {
  return (
    <svg style={style} width='8px' height='5px' viewBox='0 0 8 5' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>71A9D509-326D-42CF-8D8C-D98C8FA3003D</title>
      <desc>Created with sketchtool.</desc>
      <defs />
      <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g id='Guide---Icons' transform='translate(-454.000000, -352.000000)'>
              <g id='Icons/Arrow-Up-Gray' transform='translate(449.000000, 346.000000)'>
                  <g id='Icon-Up'>
                      <polygon id='Bounds' points='0 0 18 0 18 18 0 18' />
                      <path d='M6.5,4.91229082 L6.5,12.0877289 C6.5,12.4355268 6.90071504,12.6264917 7.16629033,12.4052836 L11.2709467,8.98865514 C11.5762941,8.73461145 11.5762941,8.26195193 11.2709467,8.00790824 L7.16629033,4.5947362 C6.90028739,4.37352809 6.5,4.56449291 6.5,4.91229082' id='Shape' fill={fill} transform='translate(9.000000, 8.500000) rotate(-90.000000) translate(-9.000000, -8.500000) ' />
                  </g>
              </g>
          </g>
      </g>
  </svg>);
}

@Radium
export default class ArrowSVG extends Component {

  static propTypes = {
    style: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  static styles = {
  };

  render () {
    const styles = this.constructor.styles;
    const { style, color } = this.props;
    return (renderSVG(color, style));
  }
}
