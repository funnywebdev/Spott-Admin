import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Root, Container, colors } from '../../../_common/styles';
import * as actions from './actions';
import selector from './selector';
import EntityDetails from '../../../_common/entityDetails';
import * as listActions from '../list/actions';
import { routerPushWithReturnTo } from '../../../../actions/global';
import Line from '../../../_common/components/line';
import SeriesEntrySeasonsList from './seasons';
import SeriesEntryEpisodesList from './episodes';
import { Tabs, Tab } from '../../../_common/components/formTabs';
import { generalStyles } from '../../../_common/components/table/index';
import TvGuideList from '../../_mediumTvGuide';
import { SideMenu } from '../../../app/sideMenu';
import Header from '../../../app/multiFunctionalHeader';

/* eslint-disable no-alert */

@connect(selector, (dispatch) => ({
  deleteSeriesEntry: bindActionCreators(listActions.deleteSeriesEntry, dispatch),
  loadSeriesEntry: bindActionCreators(actions.loadSeriesEntry, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@Radium
export default class ReadSeriesEntry extends Component {

  static propTypes = {
    children: PropTypes.node,
    currentSeriesEntry: PropTypes.object.isRequired,
    deleteSeriesEntry: PropTypes.func.isRequired,
    error: PropTypes.any,
    loadSeriesEntry: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.redirect = ::this.redirect;
    this.onClickNewEntry = :: this.onClickNewEntry;
    this.onChangeTab = :: this.onChangeTab;
  }

  async componentWillMount () {
    if (this.props.params.seriesEntryId) {
      await this.props.loadSeriesEntry(this.props.params.seriesEntryId);
    }
  }

  getName (seriesEntry) {
    return seriesEntry.get('name');
  }

  redirect () {
    this.props.routerPushWithReturnTo('/content/series', true);
  }

  onChangeTab (index) {
    this.props.routerPushWithReturnTo({ ...this.props.location, query: { ...this.props.location.query, tabIndex: index } });
  }

  onClickNewEntry (e) {
    e.preventDefault();
    const seriesEntryId = this.props.params.seriesEntryId;
    if (seriesEntryId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/create/season`);
    }
  }

  static styles= {
    table: {
      backgroundColor: colors.lightGray4,
      paddingTop: '20px'
    }
  }

  render () {
    const { children, currentSeriesEntry,
       location, deleteSeriesEntry, location: { query: { tabIndex } } } = this.props;
    const { styles } = this.constructor;
    const defaultLocale = currentSeriesEntry.getIn([ 'defaultLocale' ]);
    return (
      <SideMenu>
        <Root>
          <Header hierarchy={[
            { title: 'Series', url: '/content/series' },
            { title: currentSeriesEntry.getIn([ 'title', defaultLocale ]), url: location.pathname }
          ]}/>
          <Container>
            {currentSeriesEntry.get('_status') === 'loaded' && currentSeriesEntry &&
              <EntityDetails
                imageUrl={currentSeriesEntry.getIn([ 'profileImage', defaultLocale ]) && `${currentSeriesEntry.getIn([ 'profileImage', defaultLocale, 'url' ])}?height=203&width=360`}
                title={currentSeriesEntry.getIn([ 'title', defaultLocale ])}
                onEdit={() => this.props.routerPushWithReturnTo(`/content/series/edit/${currentSeriesEntry.getIn([ 'id' ])}`)}
                onRemove={async () => {
                  await deleteSeriesEntry(currentSeriesEntry.getIn([ 'id' ]));
                  this.redirect();
                }}/>}
          </Container>
          <Line/>
          <div style={[ generalStyles.fillPage, styles.table ]}>
            <Container>
              <Tabs activeTab={tabIndex} onChange={this.onChangeTab}>
                <Tab title='Episodes'>
                  <SeriesEntryEpisodesList {...this.props}/>
                </Tab>
                <Tab title='Seasons'>
                  <SeriesEntrySeasonsList {...this.props}/>
                </Tab>
                <Tab title='TV Guide'>
                  <TvGuideList {...this.props} mediumId={this.props.params.seriesEntryId}/>
                </Tab>
              </Tabs>
            </Container>
          </div>
          <Line/>
          {children}
        </Root>
      </SideMenu>
    );
  }

}
