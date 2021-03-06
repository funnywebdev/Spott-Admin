import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Root, Container } from '../../../_common/styles';
import { isQueryChanged, Tile, tableDecorator, generalStyles, TotalEntries, Pagination } from '../../../_common/components/table/index';
import Line from '../../../_common/components/line';
import ListView from '../../../_common/components/listView/index';
import Radium from 'radium';
import * as actions from './actions';
import selector from './selector';
import { routerPushWithReturnTo } from '../../../../actions/global';
import UtilsBar from '../../../_common/components/table/utilsBar';
import { slowdown } from '../../../../utils';
import { confirmation } from '../../../_common/askConfirmation';
import moment from 'moment';
import { SideMenu } from '../../../app/sideMenu';
import Header from '../../../app/multiFunctionalHeader';
/* eslint-disable no-alert */

@tableDecorator()
@connect(selector, (dispatch) => ({
  deleteBroadcastChannel: bindActionCreators(actions.deleteBroadcastChannel, dispatch),
  deleteBroadcastChannels: bindActionCreators(actions.deleteBroadcastChannels, dispatch),
  load: bindActionCreators(actions.load, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  selectAllCheckboxes: bindActionCreators(actions.selectAllCheckboxes, dispatch),
  selectCheckbox: bindActionCreators(actions.selectCheckbox, dispatch)
}))
@Radium
export default class BroadcastChannelList extends Component {

  static propTypes = {
    broadcastChannels: ImmutablePropTypes.map.isRequired,
    children: PropTypes.node,
    deleteBroadcastChannel: PropTypes.func.isRequired,
    deleteBroadcastChannels: PropTypes.func.isRequired,
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
    totalResultCount: PropTypes.number.isRequired,
    onChangeDisplay: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeSearchString: PropTypes.func.isRequired,
    onSortField: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClickNewEntry = ::this.onClickNewEntry;
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
      await this.slowSearch(nextProps.location.query);
    }
  }

  async deleteBroadcastChannel (broadcastChannelsId) {
    const result = await confirmation();
    if (result) {
      await this.props.deleteBroadcastChannel(broadcastChannelsId);
      await this.props.load(this.props.location.query);
    }
  }

  determineReadUrl (broadcastChannel) {
    return `/content/broadcast-channels/read/${broadcastChannel.get('id')}`;
  }

  determineEditUrl (broadcastChannel) {
    return `/content/broadcast-channels/edit/${broadcastChannel.get('id')}`;
  }

  getLastUpdatedOn (cp) {
    const date = new Date(cp.get('lastUpdatedOn'));
    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  onClickNewEntry (e) {
    e.preventDefault();
    this.props.routerPushWithReturnTo('/content/broadcast-channels/create');
  }

  async onClickDeleteSelected () {
    const broadcastChannelsIds = [];
    this.props.isSelected.forEach((selected, key) => {
      if (selected && key !== 'ALL') {
        broadcastChannelsIds.push(key);
      }
    });
    await this.props.deleteBroadcastChannels(broadcastChannelsIds);
    await this.props.load(this.props.location.query);
  }

  render () {
    const { broadcastChannels, children, deleteBroadcastChannel, isSelected, location: { query, query: { display, page, searchString, sortField, sortDirection } },
      pageCount, selectAllCheckboxes, selectCheckbox, totalResultCount,
      onChangeDisplay, onChangeSearchString } = this.props;
    const numberSelected = isSelected.reduce((total, selected, key) => selected && key !== 'ALL' ? total + 1 : total, 0);
    const columns = [
      { type: 'checkBox' },
      { type: 'custom', sort: true, sortField: 'NAME', title: 'NAME', getUrl: this.determineReadUrl, name: 'name' },
      { type: 'custom', title: 'UPDATED BY', name: 'lastUpdatedBy' },
      { type: 'custom', sort: true, sortField: 'NAME', title: 'LAST UPDATED ON', name: 'lastUpdatedOn', dataType: 'date' },
      { type: 'dropdown' }
    ];
    return (
      <SideMenu>
        <Root>
        <Header hierarchy= {[ { title: 'Broadcast Channels', url: '/content/broadcast-channels' } ]}/>
        <div style={generalStyles.backgroundBar}>
          <Container>
            <UtilsBar
              display={display}
              isLoading={broadcastChannels.get('_status') !== 'loaded'}
              searchString={searchString}
              textCreateButton='New Broadcast Channel'
              onChangeDisplay={onChangeDisplay}
              onChangeSearchString={(value) => { onChangeSearchString(value); this.slowSearch({ ...query, searchString: value }); }}
              onClickNewEntry={this.onClickNewEntry}/>
          </Container>
        </div>
        <Line/>
        <div style={[ generalStyles.backgroundTable, generalStyles.fillPage ]}>
          <Container style={generalStyles.paddingTable}>
            <TotalEntries
              entityType='Broadcast Channels'
              numberSelected={numberSelected}
              totalResultCount={totalResultCount}
              onDeleteSelected={this.onClickDeleteSelected}/>
            {(display === undefined || display === 'list') &&
              <div>
                <ListView
                  columns={columns}
                  data={broadcastChannels}
                  deleteItem={deleteBroadcastChannel}
                  getEditUrl={this.determineEditUrl}
                  isSelected={isSelected}
                  load={() => this.props.load(this.props.location.query)}
                  selectAllCheckboxes={selectAllCheckboxes}
                  sortDirection={sortDirection}
                  sortField={sortField}
                  onCheckboxChange={(id) => selectCheckbox.bind(this, id)}
                  onSortField={(name) => this.props.onSortField.bind(this, name)} />
                <Pagination currentPage={(page && (parseInt(page, 10) + 1) || 1)} pageCount={pageCount} onLeftClick={() => { this.props.onChangePage(parseInt(page, 10), false); }} onRightClick={() => { this.props.onChangePage(parseInt(page, 10), true); }}/>
              </div>}
            {display === 'grid' &&
              <div>
                <div style={generalStyles.row}>
                  {this.props.broadcastChannels.get('data').map((broadcastChannel, index) => (
                    <Tile
                      checked={isSelected.get(broadcastChannel.get('id'))}
                      imageUrl={broadcastChannel.get('logo') && `${broadcastChannel.getIn([ 'logo', 'url' ])}?height=310&width=310`}
                      key={`broadcastChannel${index}`}
                      text={broadcastChannel.get('name')}
                      onCheckboxChange={selectCheckbox.bind(this, broadcastChannel.get('id'))}
                      onDelete={async (e) => {
                        e.preventDefault();
                        await this.deleteBroadcastChannel(broadcastChannel.get('id'));
                      }}
                      onEdit={(e) => {
                        e.preventDefault();
                        this.props.routerPushWithReturnTo(`/content/broadcast-channels/edit/${broadcastChannel.get('id')}`);
                      }}/>
                  ))}
                  <Tile key={'createBroadcastChannel'} onCreate={() => { this.props.routerPushWithReturnTo('/content/broadcast-channels/create'); }}/>
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
