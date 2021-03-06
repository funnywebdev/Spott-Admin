import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Root, Container } from '../../../_common/styles';
import { Tile, UtilsBar, isQueryChanged, tableDecorator, generalStyles, TotalEntries, Pagination } from '../../../_common/components/table/index';
import Line from '../../../_common/components/line';
import ListView from '../../../_common/components/listView/index';
import Radium from 'radium';
import * as actions from './actions';
import selector from './selector';
import { styles as dropdownStyles } from '../../../_common/components/actionDropdown';
import { routerPushWithReturnTo } from '../../../../actions/global';
import { slowdown } from '../../../../utils';
import { confirmation } from '../../../_common/askConfirmation';
import { SideMenu } from '../../../app/sideMenu';
import Header from '../../../app/multiFunctionalHeader';

@tableDecorator()
@connect(selector, (dispatch) => ({
  deleteSeriesEntry: bindActionCreators(actions.deleteSeriesEntry, dispatch),
  deleteSeriesEntries: bindActionCreators(actions.deleteSeriesEntries, dispatch),
  load: bindActionCreators(actions.load, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  selectAllCheckboxes: bindActionCreators(actions.selectAllCheckboxes, dispatch),
  selectCheckbox: bindActionCreators(actions.selectCheckbox, dispatch)
}))
@Radium
export default class SeriesEntries extends Component {

  static propTypes = {
    children: PropTypes.node,
    deleteSeriesEntries: PropTypes.func.isRequired,
    deleteSeriesEntry: PropTypes.func.isRequired,
    isSelected: ImmutablePropTypes.map.isRequired,
    load: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object.isRequired
    }),
    pageCount: PropTypes.number,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    selectAllCheckboxes: PropTypes.func.isRequired,
    selectCheckbox: PropTypes.func.isRequired,
    seriesEntries: ImmutablePropTypes.map.isRequired,
    totalResultCount: PropTypes.number.isRequired,
    onChangeDisplay: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeSearchString: PropTypes.func.isRequired,
    onSortField: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCreateSeriesEntry = ::this.onCreateSeriesEntry;
    this.onCreateSeason = ::this.onCreateSeason;
    this.onCreateEpisode = ::this.onCreateEpisode;
    this.onClickDeleteSelected = ::this.onClickDeleteSelected;
    this.slowSearch = slowdown(props.load, 300);
  }

  async componentWillMount () {
    await this.props.load(this.props.location.query);
  }

  async componentWillReceiveProps (nextProps) {
    const nextQuery = nextProps.location.query;
    const query = this.props.location.query;
    if (isQueryChanged(query, nextQuery)) {
      this.slowSearch(nextQuery);
    }
  }

  async deleteSeriesEntry (seriesEntrysId) {
    const result = await confirmation();
    if (result) {
      await this.props.deleteSeriesEntry(seriesEntrysId);
      await this.props.load(this.props.location.query);
    }
  }

  determineReadUrl (seriesEntrys) {
    return `/content/series/read/${seriesEntrys.get('id')}`;
  }

  determineEditUrl (seriesEntrys) {
    return `/content/series/edit/${seriesEntrys.get('id')}`;
  }

  getLastUpdatedOn (seriesEntry) {
    const date = new Date(seriesEntry.get('lastUpdatedOn'));
    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  onCreateSeriesEntry (e) {
    e.preventDefault();
    this.props.routerPushWithReturnTo('/content/series/create');
  }

  onCreateSeason (e) {
    e.preventDefault();
    this.props.routerPushWithReturnTo('/content/series/create/season');
  }

  onCreateEpisode (e) {
    e.preventDefault();
    this.props.routerPushWithReturnTo('/content/series/create/episode');
  }

  async onClickDeleteSelected () {
    const seriesEntryIds = [];
    this.props.isSelected.forEach((selected, key) => {
      if (selected && key !== 'ALL') {
        seriesEntryIds.push(key);
      }
    });
    await this.props.deleteSeriesEntries(seriesEntryIds);
    await this.props.load(this.props.location.query);
  }

  render () {
    const { seriesEntries, children, deleteSeriesEntry, isSelected, location: { query, query: { display, page, searchString, sortField, sortDirection } },
      pageCount, selectAllCheckboxes, selectCheckbox, totalResultCount, onChangeDisplay, onChangeSearchString } = this.props;
    const numberSelected = isSelected.reduce((total, selected, key) => selected && key !== 'ALL' ? total + 1 : total, 0);
    const columns = [
      { type: 'checkBox' },
      { type: 'custom', sort: true, sortField: 'TITLE', title: 'TITLE', clickable: true, getUrl: this.determineReadUrl, name: 'title' },
      { type: 'custom', title: 'UPDATED BY', name: 'lastUpdatedBy' },
      { type: 'custom', title: 'LAST UPDATED ON', name: 'lastUpdatedOn', dataType: 'date' },
      { type: 'dropdown' }
    ];
    return (
      <SideMenu>
        <Root>
          <Header hierarchy={[
            { title: 'Series', url: '/content/series' } ]}/>
          <div style={generalStyles.backgroundBar}>
            <Container>
              <UtilsBar
                display={display}
                isLoading={seriesEntries.get('_status') !== 'loaded'}
                menu= {<div style={[ dropdownStyles.floatOptions, dropdownStyles.extraWide ]}>
                  <div key='menuElementSeason' style={[ dropdownStyles.floatOption ]} onClick={this.onCreateSeason}>
                    Add Season
                  </div>
                  <div style={dropdownStyles.line}/>
                  <div key='menuElementEpisode' style={[ dropdownStyles.floatOption ]} onClick={this.onCreateEpisode}>
                    Add Episode
                  </div>
                </div>}
                numberSelected={numberSelected}
                searchString={searchString}
                textCreateButton='New Series Entry'
                topElement={<div onClick={this.onCreateSeriesEntry}>Add Series</div>}
                onChangeDisplay={onChangeDisplay}
                onChangeSearchString={(value) => { onChangeSearchString(value); this.slowSearch({ ...query, searchString: value }); }}
                onClickNewEntry={this.onCreateSeriesEntry}/>
            </Container>
          </div>
          <Line/>
          <div style={[ generalStyles.backgroundTable, generalStyles.fillPage ]}>
            <Container style={generalStyles.paddingTable}>
              <TotalEntries
                entityType='Series'
                numberSelected={numberSelected}
                totalResultCount={totalResultCount}
                onDeleteSelected={this.onClickDeleteSelected}/>
              {(display === undefined || display === 'list') &&
                <div>
                  <ListView
                    columns={columns}
                    data={seriesEntries}
                    deleteItem={deleteSeriesEntry}
                    getEditUrl={this.determineEditUrl}
                    isSelected={isSelected}
                    load={() => this.props.load(this.props.location.query)}
                    selectAllCheckboxes={selectAllCheckboxes}
                    sortDirection={sortDirection}
                    sortField={sortField}
                    onCheckboxChange={(id) => selectCheckbox.bind(this, id)}
                    onSortField={(name) => this.props.onSortField.bind(this, name)} />
                  <Pagination currentPage={(page && (parseInt(page, 10) + 1) || 1)} pageCount={pageCount} onLeftClick={() => { this.props.onChangePage(parseInt(page, 10), false); }} onRightClick={() => { this.props.onChangePage(parseInt(page, 10), true); }}/>
                </div>
              }
              {display === 'grid' &&
                <div>
                  <div style={generalStyles.row}>
                    {seriesEntries.get('data').map((seriesEntry, index) => (
                      <Tile
                        checked={isSelected.get(seriesEntry.get('id'))}
                        imageUrl={seriesEntry.get('profileImage') && `${seriesEntry.getIn([ 'profileImage', 'url' ])}?height=203&width=360`}
                        key={`seriesEntry${index}`}
                        text={seriesEntry.get('title')}
                        onCheckboxChange={selectCheckbox.bind(this, seriesEntry.get('id'))}
                        onClick={() => { this.props.routerPushWithReturnTo(`/content/series/read/${seriesEntry.get('id')}`); }}
                        onDelete={async (e) => { e.preventDefault(); await this.deleteSeriesEntry(seriesEntry.get('id')); }}
                        onEdit={(e) => { e.preventDefault(); this.props.routerPushWithReturnTo(`/content/series/edit/${seriesEntry.get('id')}`); }}/>
                    ))}
                    <Tile key={'createSeriesEntry'} onCreate={() => { this.props.routerPushWithReturnTo('/content/series/create'); }}/>
                  </div>
                  <Pagination currentPage={(page && (parseInt(page, 10) + 1) || 1)} pageCount={pageCount} onLeftClick={() => { this.props.onChangePage(parseInt(page, 10), false); }} onRightClick={() => { this.props.onChangePage(parseInt(page, 10), true); }}/>
                </div>
              }
            </Container>
          </div>
          {children}
        </Root>
      </SideMenu>
    );
  }

}
