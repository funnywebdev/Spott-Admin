import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Root, Container } from '../../../_common/styles';
import { CheckBoxCel, Tile, UtilsBar, isQueryChanged, tableDecorator, generalStyles, TotalEntries, Pagination } from '../../../_common/components/table/index';
import Line from '../../../_common/components/line';
import ListView from '../../../_common/components/listView/index';
import Radium from 'radium';
import * as actions from './actions';
import selector from './selector';
import { routerPushWithReturnTo } from '../../../../actions/global';
import { slowdown } from '../../../../utils';
import { confirmation } from '../../../_common/askConfirmation';
import { SideMenu } from '../../../app/sideMenu';
import Header from '../../../app/multiFunctionalHeader';
import ToolTip from '../../../_common/components/toolTip';

@tableDecorator()
@connect(selector, (dispatch) => ({
  deleteShop: bindActionCreators(actions.deleteShop, dispatch),
  deleteShops: bindActionCreators(actions.deleteShops, dispatch),
  load: bindActionCreators(actions.load, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  selectAllCheckboxes: bindActionCreators(actions.selectAllCheckboxes, dispatch),
  selectCheckbox: bindActionCreators(actions.selectCheckbox, dispatch)
}))
@Radium
export default class Shops extends Component {

  static propTypes = {
    children: PropTypes.node,
    deleteShop: PropTypes.func.isRequired,
    deleteShops: PropTypes.func.isRequired,
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
    shops: ImmutablePropTypes.map.isRequired,
    totalResultCount: PropTypes.number.isRequired,
    onChangeDisplay: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeSearchString: PropTypes.func.isRequired,
    onSortField: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCreateShop = ::this.onCreateShop;
    this.onClickDeleteSelected = ::this.onClickDeleteSelected;
    this.slowSearch = slowdown(props.load, 300);
  }

  componentWillMount () {
    this.props.load(this.props.location.query);
  }

  async componentWillReceiveProps (nextProps) {
    const nextQuery = nextProps.location.query;
    const query = this.props.location.query;
    if (isQueryChanged(query, nextQuery)) {
      this.slowSearch(nextQuery);
    }
  }

  async deleteShop (shopsId) {
    const result = await confirmation();
    if (result) {
      await this.props.deleteShop(shopsId);
      await this.props.load(this.props.location.query);
    }
  }

  determineReadUrl (shop) {
    return `/content/shops/read/${shop.get('id')}`;
  }

  determineEditUrl (shop) {
    return `/content/shops/edit/${shop.get('id')}`;
  }

  getBasketEnable (shop) {
    return <CheckBoxCel checked={shop.get('universalBasketEnabled')}/>;
  }

  getLastUpdatedOn (shop) {
    const date = new Date(shop.get('lastUpdatedOn'));
    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  getNameItem (shop) {
    const styles = {
      logo: {
        width: '22px',
        height: '22px',
        borderRadius: '2px'
      },
      logoContainer: {
        paddingRight: '10px',
        display: 'inline-flex'
      },
      logoPlaceholder: {
        paddingRight: '32px'
      }
    };
    return (
      <div style={{ alignItems: 'center', display: 'inline-flex' }}>
        {shop.get('logo') && <div style={styles.logoContainer}>
        <ToolTip
          overlay={<img src={`${shop.getIn([ 'logo', 'url' ])}?height=150&width=150`}/>}
          placement='top'
          prefixCls='no-arrow'>
          <img src={`${shop.getIn([ 'logo', 'url' ])}?height=150&width=150`} style={styles.logo} />
        </ToolTip>
        </div> || <div style={styles.logoPlaceholder}/>}{shop.get('name')}
      </div>
    );
  }

  onCreateShop (e) {
    e.preventDefault();
    this.props.routerPushWithReturnTo('/content/shops/create');
  }

  async onClickDeleteSelected () {
    const shopIds = [];
    this.props.isSelected.forEach((selected, key) => {
      if (selected && key !== 'ALL') {
        shopIds.push(key);
      }
    });
    await this.props.deleteShops(shopIds);
    await this.props.load(this.props.location.query);
  }

  render () {
    const { shops, children, deleteShop, isSelected, location: { query, query: { display, page, searchString, sortField, sortDirection } },
      pageCount, selectAllCheckboxes, selectCheckbox, totalResultCount, onChangeDisplay, onChangeSearchString } = this.props;
    const numberSelected = isSelected.reduce((total, selected, key) => selected && key !== 'ALL' ? total + 1 : total, 0);
    const columns = [
      { type: 'checkBox' },
      { type: 'custom', sort: true, sortField: 'NAME', title: 'NAME', clickable: true, getUrl: this.determineReadUrl, convert: this.getNameItem, colspan: 2 },
      { type: 'custom', title: 'UNIVERSAL BASKET', colspan: 1, convert: this.getBasketEnable },
      { type: 'custom', title: 'UPDATED BY', name: 'lastUpdatedBy', colspan: 2 },
      { type: 'custom', sort: true, sortField: 'LAST_MODIFIED', title: 'LAST UPDATED ON', convert: this.getLastUpdatedOn, colspan: 2 },
      { type: 'dropdown' }
    ];
    return (
      <SideMenu>
        <Root>
        <Header hierarchy={[
          { title: 'Shops', url: '/content/shops' } ]}/>
          <div style={generalStyles.backgroundBar}>
            <Container>
              <UtilsBar
                display={display}
                isLoading={shops.get('_status') !== 'loaded'}
                numberSelected={numberSelected}
                searchString={searchString}
                textCreateButton='New Shop'
                onChangeDisplay={onChangeDisplay}
                onChangeSearchString={(value) => { onChangeSearchString(value); this.slowSearch({ ...query, searchString: value }); }}
                onClickNewEntry={this.onCreateShop}/>
            </Container>
          </div>
          <Line/>
          <div style={[ generalStyles.backgroundTable, generalStyles.fillPage ]}>
            <Container style={generalStyles.paddingTable}>
              <TotalEntries
                entityType='Shops'
                numberSelected={numberSelected}
                totalResultCount={totalResultCount}
                onDeleteSelected={this.onClickDeleteSelected}/>
              {(display === undefined || display === 'list') &&
                <div>
                  <ListView
                    columns={columns}
                    data={shops}
                    deleteItem={deleteShop}
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
                    {shops.get('data').map((shop, index) => (
                      <Tile
                        checked={isSelected.get(shop.get('id'))}
                        imageUrl={shop.get('logo') && `${shop.getIn([ 'logo', 'url' ])}?height=203&width=360`}
                        key={`shop${index}`}
                        text={shop.get('name')}
                        onCheckboxChange={selectCheckbox.bind(this, shop.get('id'))}
                        onClick={() => { this.props.routerPushWithReturnTo(`/content/shops/read/${shop.get('id')}`); }}
                        onDelete={async (e) => { e.preventDefault(); await this.deleteShop(shop.get('id')); }}
                        onEdit={(e) => { e.preventDefault(); this.props.routerPushWithReturnTo(`/content/shops/edit/${shop.get('id')}`); }}/>
                    ))}
                    <Tile key={'createShop'} onCreate={() => { this.props.routerPushWithReturnTo('/content/shops/create'); }}/>
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
