import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { routerPushWithReturnTo } from '../../../actions/global';
import moment from 'moment';
import { DropdownCel, isQueryChanged, tableDecorator, generalStyles, TotalEntries, headerStyles, NONE, sortDirections, CheckBoxCel, Table, Headers, CustomCel, Rows, Row, Pagination } from '../../_common/components/table/index';
import Line from '../../_common/components/line';
import Radium from 'radium';
import * as actions from './actions';
import selector from './selector';
import Dropdown, { styles as dropdownStyles } from '../../_common/components/actionDropdown';
import UtilsBar from '../../_common/components/table/utilsBar';
import { confirmation } from '../../_common/askConfirmation';
import { slowdown } from '../../../utils';

/* eslint-disable react/no-set-state*/

const numberOfRows = 25;

export const prefix = 'tvGuide';
@tableDecorator(prefix)
@connect(selector, (dispatch) => ({
  deleteTvGuideEntries: bindActionCreators(actions.deleteTvGuideEntries, dispatch),
  deleteTvGuideEntry: bindActionCreators(actions.deleteTvGuideEntry, dispatch),
  load: bindActionCreators(actions.load, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  selectAllCheckboxes: bindActionCreators(actions.selectAllCheckboxes, dispatch),
  selectCheckbox: bindActionCreators(actions.selectCheckbox, dispatch),
  selectEntity: bindActionCreators(actions.selectEntity, dispatch)
}))
@Radium
export default class TvGuideList extends Component {

  static propTypes = {
    children: PropTypes.node,
    deleteTvGuideEntries: PropTypes.func.isRequired,
    deleteTvGuideEntry: PropTypes.func.isRequired,
    isSelected: ImmutablePropTypes.map.isRequired,
    load: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object.isRequired
    }),
    // used in selectors
    mediumId: PropTypes.string.isRequired,
    pageCount: PropTypes.number,
    params: PropTypes.object.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    selectAllCheckboxes: PropTypes.func.isRequired,
    selectCheckbox: PropTypes.func.isRequired,
    totalResultCount: PropTypes.number.isRequired,
    tvGuideEntries: ImmutablePropTypes.map.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeSearchString: PropTypes.func.isRequired,
    onSortField: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onClickDeleteSelected = ::this.onClickDeleteSelected;
    this.onClickNewEntry = ::this.onClickNewEntry;
    this.onClickEditEntry = :: this.onClickEditEntry;
    this.slowSearch = slowdown(props.load, 300);
  }

  async componentWillMount () {
    const { load, location, mediumId } = this.props;
    await load(location.query, mediumId);
  }

  async componentWillReceiveProps (nextProps) {
    const nextQuery = nextProps.location.query;
    const query = this.props.location.query;
    if (isQueryChanged(query, nextQuery, prefix)) {
      await this.slowSearch(nextProps.location.query, this.props.mediumId);
    }
  }

  getMediumTitle (tvGuideEntry) {
    // in case of a serie
    if (tvGuideEntry.get('medium') && tvGuideEntry.get('season') && tvGuideEntry.get('serie')) {
      const serie = tvGuideEntry.get('serie').get('title');
      const season = tvGuideEntry.get('season').get('title');
      const episode = tvGuideEntry.get('medium').get('title');
      return `${serie} - ${season} - ${episode}`;
    }
    // in case of a movie
    return tvGuideEntry.get('medium').get('title');
  }

  getStartDate (tvGuideEntry) {
    return moment(tvGuideEntry.get('start')).format('YYYY-MM-DD HH:mm');
  }

  getEndDate (tvGuideEntry) {
    return moment(tvGuideEntry.get('end')).format('YYYY-MM-DD HH:mm');
  }

  getChannelName (tvGuideEntry) {
    return tvGuideEntry.getIn([ 'channel', 'name' ]);
  }

  getUpdatedBy (tvGuideEntry) {
    return tvGuideEntry.get('lastUpdatedBy');
  }

  getLastUpdatedOn (tvGuideEntry) {
    return moment(tvGuideEntry.get('lastUpdatedOn')).format('YYYY-MM-DD HH:mm');
  }

  async deleteTvGuideEntry (tvGuideEntryId) {
    const result = await confirmation();
    if (result) {
      await this.props.deleteTvGuideEntry(tvGuideEntryId);
      await this.props.load(this.props.location.query, this.props.mediumId);
    }
  }

  onClickEditEntry (tvGuideId) {
    const { seriesEntryId, seasonId, episodeId, movieId } = this.props.params;
    if (seriesEntryId && seasonId && episodeId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/seasons/read/${seasonId}/episodes/read/${episodeId}/tv-guide/edit/${tvGuideId}`);
    } else if (seriesEntryId && seasonId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/seasons/read/${seasonId}/tv-guide/edit/${tvGuideId}`);
    } else if (seriesEntryId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/tv-guide/edit/${tvGuideId}`);
    } else if (movieId) {
      this.props.routerPushWithReturnTo(`/content/movies/read/${movieId}/tv-guide/edit/${tvGuideId}`);
    }
  }

  onClickNewEntry () {
    const { seriesEntryId, seasonId, episodeId, movieId } = this.props.params;
    if (seriesEntryId && seasonId && episodeId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/seasons/read/${seasonId}/episodes/read/${episodeId}/create/tv-guide`);
    } else if (seriesEntryId && seasonId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/seasons/read/${seasonId}/create/tv-guide`);
    } else if (seriesEntryId) {
      this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntryId}/create/tv-guide`);
    } else if (movieId) {
      this.props.routerPushWithReturnTo(`/content/movies/read/${movieId}/create/tv-guide`);
    }
  }

  async onClickDeleteSelected () {
    const tvGuideEntryIds = [];
    this.props.isSelected.forEach((selected, key) => {
      if (selected && key !== 'ALL') {
        tvGuideEntryIds.push(key);
      }
    });
    await this.props.deleteTvGuideEntries(tvGuideEntryIds);
    await this.props.load(this.props.location.query, this.props.params.episodeId);
  }

  render () {
    const { mediumId, isSelected, pageCount, selectAllCheckboxes,
      selectCheckbox, totalResultCount, tvGuideEntries, location: { query: { tvGuidePage,
        tvGuideSortField, tvGuideSortDirection } } } = this.props;
    const numberSelected = isSelected.reduce((total, selected, key) => selected && key !== 'ALL' ? total + 1 : total, 0);
    return (
      <div style={generalStyles.border}>
        <div style={generalStyles.backgroundBar}>
          <div style={generalStyles.paddingLeftAndRight}>
            <UtilsBar
              isLoading={tvGuideEntries.get('_status') !== 'loaded'}
              numberSelected={numberSelected}
              textCreateButton='New Tv Guide Entry'
              onClickNewEntry={this.onClickNewEntry}/>
          </div>
        </div>
        <Line/>
        <div style={[ generalStyles.backgroundTable, generalStyles.fillPage, generalStyles.whiteBackground ]}>
          <div style={[ generalStyles.paddingTable, generalStyles.paddingLeftAndRight ]}>
            <TotalEntries
              entityType='TV Guide'
              numberSelected={numberSelected}
              totalResultCount={totalResultCount}
              onDeleteSelected={this.onClickDeleteSelected}/>
            <Table style={generalStyles.lightGrayBorder}>
              <Headers>
                {/* Be aware that width or flex of each headerCel and the related rowCel must be the same! */}
                <CheckBoxCel checked={isSelected.get('ALL')} name='header' style={[ headerStyles.base, headerStyles.first ]} onChange={selectAllCheckboxes.bind(this.mediumId)}/>
                <CustomCel style={[ headerStyles.base, { flex: 1 } ]}>Channel</CustomCel>
                <CustomCel style={[ headerStyles.base, { flex: 2 } ]}>Title</CustomCel>
                <CustomCel
                  sortColumn={this.props.onSortField.bind(this, 'START')}
                  sortDirection={tvGuideSortField === 'START' ? sortDirections[tvGuideSortDirection] : NONE}
                  style={[ headerStyles.base, headerStyles.clickable, { flex: 1 } ]}>
                  Start
                </CustomCel>
                <CustomCel style={[ headerStyles.base, { flex: 1 } ]}>End</CustomCel>
                <CustomCel style={[ headerStyles.base, { flex: 0.8 } ]}>Updated by</CustomCel>
                <CustomCel
                  sortColumn={this.props.onSortField.bind(this, 'LAST_MODIFIED')}
                  sortDirection={tvGuideSortField === 'LAST_MODIFIED' ? sortDirections[tvGuideSortDirection] : NONE}
                  style={[ headerStyles.base, headerStyles.clickable, { flex: 1 } ]}>
                  Last updated on
                </CustomCel>
                <DropdownCel style={headerStyles.base}/>
              </Headers>
              <Rows isLoading={tvGuideEntries.get('_status') !== 'loaded'}>
                {tvGuideEntries.get('data').map((tvGuideEntry, index) => {
                  return (
                    <Row index={index} isFirst={index % numberOfRows === 0} key={index} >
                      {/* Be aware that width or flex of each headerCel and the related rowCel must be the same! */}
                      <CheckBoxCel checked={isSelected.get(tvGuideEntry.get('id'))} onChange={selectCheckbox.bind(this, tvGuideEntry.get('id'), mediumId)}/>
                      <CustomCel getValue={this.getChannelName} objectToRender={tvGuideEntry} style={{ flex: 1 }} />
                      <CustomCel getValue={this.getMediumTitle} objectToRender={tvGuideEntry} style={{ flex: 2 }}/>
                      <CustomCel getValue={this.getStartDate} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <CustomCel getValue={this.getEndDate} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <CustomCel getValue={this.getUpdatedBy} objectToRender={tvGuideEntry} style={{ flex: 0.8 }}/>
                      <CustomCel getValue={this.getLastUpdatedOn} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <DropdownCel>
                        <Dropdown
                          elementShown={<div key={0} style={[ dropdownStyles.clickable, dropdownStyles.option, dropdownStyles.borderLeft ]} onClick={this.onClickEditEntry.bind(this, tvGuideEntry.get('id'))}>Edit</div>}>
                          <div key={1} style={dropdownStyles.floatOption} onClick={async (e) => { e.preventDefault(); await this.deleteTvGuideEntry(tvGuideEntry.get('id')); }}>Remove</div>
                        </Dropdown>
                      </DropdownCel>
                    </Row>
                  );
                })}
              </Rows>
            </Table>
            <Pagination
              currentPage={(tvGuidePage && (parseInt(tvGuidePage, 10) + 1) || 1)}
              pageCount={pageCount}
              onLeftClick={() => { this.props.onChangePage(parseInt(tvGuidePage, 10), false); }}
              onRightClick={() => { this.props.onChangePage(parseInt(tvGuidePage, 10), true); }}/>
        </div>
      </div>
    </div>

    );
  }

}
