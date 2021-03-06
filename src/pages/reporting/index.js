import React, { Component, PropTypes } from 'react';
import { routerPushWithReturnTo } from '../../actions/global';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { colors, fontWeights, makeTextStyle, Container } from '../_common/styles';
import MediaFilterForm
from './_mediaFilter';
import * as activityActions from './activity/actions';
import * as rankingsActions from './rankings/actions';
import { SideMenu } from '../app/sideMenu';
import Header from '../app/multiFunctionalHeader';

@connect(null, (dispatch) => ({
  loadActivities: bindActionCreators(activityActions.loadActivities, dispatch),
  loadRankings: bindActionCreators(rankingsActions.loadRankings, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@Radium
export default class Reporting extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    loadActivities: PropTypes.func.isRequired,
    loadRankings: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    routerPushWithReturnTo: PropTypes.func.isRequired
  };

  static styles = {
    tabs: {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: colors.lightGray2
    },
    tab: {
      container: {
        display: 'inline-block',
        paddingRight: '3em'
      },
      base: {
        ...makeTextStyle(fontWeights.regular, '0.875em'),
        color: colors.black,
        opacity: 0.5,
        paddingBottom: '1.5em',
        paddingTop: '1.5em',
        textDecoration: 'none',
        textAlign: 'center',
        display: 'inline-block',
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        marginBottom: -1
      },
      active: {
        borderBottomColor: colors.primaryBlue,
        opacity: 1
      }
    },
    mediaFilterForm: {
      float: 'right',
      width: '50%',
      paddingBottom: '1em'
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    fullWidth: {
      width: '100%'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { children, location } = this.props;
    const { query: { media } } = location;
    return (
      <SideMenu location={location}>
        <Header hierarchy={[ { title: 'Reporting', url: '/reporting/activity' } ]}/>
        <div style={styles.fullWidth}>
          <div style={styles.tabs}>
            <Container style={styles.wrapper}>
              <div>
                <div style={styles.tab.container}>
                  <Link activeStyle={styles.tab.active} style={styles.tab.base} to={{
                    ...location,
                    pathname: '/reporting/activity'
                  }}>Activity</Link>
                </div>
                <div style={styles.tab.container}>
                  <Link activeStyle={styles.tab.active} style={styles.tab.base} to={{
                    ...location,
                    pathname: '/reporting/rankings'
                  }}>Rankings</Link>
                </div>
              </div>
              <MediaFilterForm
                fields={{
                  media: typeof media === 'string' ? [ media ] : media
                }}
                style={styles.mediaFilterForm}
                onChange={(field, type, value) => {
                  this.props.routerPushWithReturnTo({
                    ...location,
                    query: {
                      ...location.query,
                      [field]: type === 'string' || type === 'array' ? value : value.format('YYYY-MM-DD') }
                  });
                }} />
            </Container>
          </div>
          {children}
        </div>
      </SideMenu>
    );
  }
}
