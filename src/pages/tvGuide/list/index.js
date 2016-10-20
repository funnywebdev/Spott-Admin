import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push as routerPush } from 'react-router-redux';
import moment from 'moment';
import Header from '../../app/header';
import { buttonStyles, colors, fontWeights, Container, makeTextStyle } from '../../_common/styles';
import { determineSortDirection, NONE, sortDirections, CheckBoxCel, Table, Headers, TextCel, Rows, Row, Pagination } from '../../_common/components/table';
import Radium from 'radium';
import * as actions from './actions';
import selector from './selector';
import Dropdown, { styles as dropdownStyles } from '../../_common/components/dropdown';

/* eslint-disable react/no-set-state*/
const numberOfRows = 25;

@connect(selector, (dispatch) => ({
  deleteTvGuideEntries: bindActionCreators(actions.deleteTvGuideEntries, dispatch),
  load: bindActionCreators(actions.load, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  selectAllCheckboxes: bindActionCreators(actions.selectAllCheckboxes, dispatch),
  selectCheckbox: bindActionCreators(actions.selectCheckbox, dispatch)
}))
@Radium
export default class ContentProducers extends Component {

  static propTypes = {
    children: PropTypes.node,
    deleteTvGuideEntries: PropTypes.func.isRequired,
    isSelected: ImmutablePropTypes.map.isRequired,
    load: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object.isRequired
    }),
    pageCount: PropTypes.number,
    routerPush: PropTypes.func.isRequired,
    selectAllCheckboxes: PropTypes.func.isRequired,
    selectCheckbox: PropTypes.func.isRequired,
    totalResultCount: PropTypes.number.isRequired,
    tvGuideEntries: ImmutablePropTypes.map.isRequired
  };

  constructor (props) {
    super(props);
    this.onClickDeleteSelected = ::this.onClickDeleteSelected;
    this.onClickNewEntry = ::this.onClickNewEntry;
  }

  componentWillMount () {
    this.props.load(this.props.location.query);
  }

  componentWillReceiveProps (nextProps) {
    const nextQuery = nextProps.location.query;
    const query = this.props.location.query;
    if (query.page !== nextQuery.page ||
      query.pageSize !== nextQuery.pageSize ||
      query.sortDirection !== nextQuery.sortDirection ||
      query.sortField !== nextQuery.sortField ||
      query.searchString !== nextQuery.searchString) {
      this.props.load(nextProps.location.query);
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
    return moment(tvGuideEntry.get('start')).format('DD/MM/YYYY hh:mm');
  }

  getEndDate (tvGuideEntry) {
    return moment(tvGuideEntry.get('end')).format('DD/MM/YYYY hh:mm');
  }

  getChannelName (tvGuideEntry) {
    return tvGuideEntry.getIn([ 'channel', 'name' ]);
  }

  getUpdatedBy (tvGuideEntry) {
    return tvGuideEntry.get('lastUpdatedBy');
  }

  getLastUpdatedOn (tvGuideEntry) {
    const date = new Date(tvGuideEntry.get('lastUpdatedOn'));
    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  onSortField (sortField) {
    const query = {
      ...this.props.location.query,
      page: 0,
      sortField,
      sortDirection: determineSortDirection(sortField, this.props.location.query)
    };
    // props will be updated -> componentWillReceiveProps
    this.props.routerPush({
      ...this.props.location,
      query
    });
  }

  onChangePage (page = 0, next = true) {
    const nextPage = next ? page + 1 : page - 1;
    const query = {
      ...this.props.location.query,
      page: nextPage
    };
    // props will be updated -> componentWillReceiveProps
    this.props.routerPush({
      ...this.props.location,
      query
    });
  }

  onClickNewEntry (e) {
    e.preventDefault();
    this.props.routerPush({
      pathname: 'tv-guide/create',
      state: { returnTo: this.props.location }
    });
  }

  async onClickDeleteSelected (e) {
    e.preventDefault();
    const tvGuideEntryIds = [];
    this.props.isSelected.forEach((selected, key) => {
      if (selected && key !== 'ALL') {
        tvGuideEntryIds.push(key);
      }
    });
    await this.props.deleteTvGuideEntries(tvGuideEntryIds);
    await this.props.load(this.props.location.query);
  }

  static styles = {
    header: {
      ...makeTextStyle(null, '0.688em', '0.50px'),
      backgroundColor: colors.white,
      color: colors.darkGray2,
      height: '32px',
      textTransform: 'uppercase'
    },
    firstHeader: {
      borderBottom: `1px solid ${colors.lightGray2}`
    },
    notFirstHeader: {
      borderLeft: `1px solid ${colors.lightGray2}`,
      borderBottom: `1px solid ${colors.lightGray2}`
    },
    filterContainer: {
      textAlign: 'right',
      paddingBottom: '1.25em',
      paddingTop: '1.25em'
    },
    tableTitle: {
      base: {
        ...makeTextStyle(fontWeights.medium, '0.75em'),
        paddingBottom: '1.25em',
        paddingTop: '1.25em'
      },
      entries: {
        ...makeTextStyle(fontWeights.regular)
      },
      entity: {
        color: colors.veryDarkGray,
        textTransform: 'uppercase'
      },
      count: {
        color: '#536970'
      }
    }
  }

  render () {
    const { children, isSelected, location: { pathname, query: { page, sortField, sortDirection } },
      pageCount, selectAllCheckboxes, selectCheckbox, totalResultCount, tvGuideEntries } = this.props;
    const { styles } = this.constructor;
    const numberSelected = isSelected.reduce((total, selected, key) => selected && key !== 'ALL' ? total + 1 : total, 0);

    return (
      <div>
        <Header currentPath={pathname} hideHomePageLinks />
        <div style={{ backgroundColor: colors.veryLightGray }}>
          <Container style={styles.filterContainer}>
            <button key='delete' style={[ buttonStyles.base, buttonStyles.small, buttonStyles.blue, { marginLeft: 0 } ]} type='button' onClick={this.onClickDeleteSelected}>Delete {numberSelected}</button>
            <button key='create' style={[ buttonStyles.base, buttonStyles.small, buttonStyles.blue ]} type='button' onClick={this.onClickNewEntry}>New entry</button>
          </Container>
        </div>
        <div style={{ backgroundColor: colors.lightGray }}>
          <Container style={{ paddingTop: '1.875em', paddingBottom: '1.875em' }}>
            <div style={styles.tableTitle.base}>
              <span style={styles.tableTitle.entity}>Entries</span><span style={styles.tableTitle.count}>&nbsp;&nbsp;{totalResultCount} <span style={styles.tableTitle.entries}>Entries</span></span>
            </div>
            <Table>
              <Headers>
                {/* Be aware that width or flex of each headerCel and the related rowCel must be the same! */}
                <CheckBoxCel checked={isSelected.get('ALL')} name='header' style={[ styles.header, styles.firstHeader, { flex: 0.5 } ]} onChange={selectAllCheckboxes}/>
                <TextCel style={[ styles.header, styles.notFirstHeader, { flex: 1 } ]}>Channel</TextCel>
                <TextCel style={[ styles.header, styles.notFirstHeader, { flex: 2 } ]}>Title</TextCel>
                <TextCel
                  sortColumn={this.onSortField.bind(this, 'START')}
                  sortDirection={sortField === 'START' ? sortDirections[sortDirection] : NONE}
                  style={[ styles.header, styles.notFirstHeader, { flex: 1 } ]}>
                  Start
                </TextCel>
                <TextCel style={[ styles.header, styles.notFirstHeader, { flex: 1 } ]}>End</TextCel>
                <TextCel style={[ styles.header, styles.notFirstHeader, { flex: 1 } ]}>Updated by</TextCel>
                <TextCel
                  sortColumn={this.onSortField.bind(this, 'LAST_MODIFIED')}
                  sortDirection={sortField === 'LAST_MODIFIED' ? sortDirections[sortDirection] : NONE}
                  style={[ styles.header, styles.notFirstHeader, { flex: 1 } ]}>
                  Last updated on
                </TextCel>
                <TextCel style={[ styles.header, styles.notFirstHeader, { flex: 1 } ]}/>
              </Headers>
              <Rows isLoading={tvGuideEntries.get('_status') !== 'loaded'}>
                {tvGuideEntries.get('data').map((tvGuideEntry, index) => {
                  return (
                    <Row index={index} isFirst={index % numberOfRows === 0} key={index} >
                      {/* Be aware that width or flex of each headerCel and the related rowCel must be the same! */}
                      <CheckBoxCel checked={isSelected.get(tvGuideEntry.get('id'))} style={{ flex: 0.5 }} onChange={selectCheckbox.bind(this, tvGuideEntry.get('id'))}/>
                      <TextCel getValue={this.getChannelName} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <TextCel getValue={this.getMediumTitle} objectToRender={tvGuideEntry} style={{ flex: 2 }}/>
                      <TextCel getValue={this.getStartDate} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <TextCel getValue={this.getEndDate} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <TextCel getValue={this.getUpdatedBy} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <TextCel getValue={this.getLastUpdatedOn} objectToRender={tvGuideEntry} style={{ flex: 1 }}/>
                      <div style={[ dropdownStyles.center, { flex: 1, ...makeTextStyle(fontWeights.regular, '11px', '0.3px') } ]}>
                        <Dropdown
                          elementShown={<div key={0} style={[ dropdownStyles.clickable, dropdownStyles.topElement ]} onClick={() => { console.log('top'); }}>Edit</div>}
                          onChange={(e) => { console.log(e); }}>
                          <div key={1} style={[ dropdownStyles.option ]} onClick={() => { console.log('rest'); }}>Remove</div>
                        </Dropdown>
                      </div>
                    </Row>
                  );
                })}
              </Rows>
            </Table>
            <Pagination currentPage={(page && (parseInt(page, 10) + 1) || 1)} pageCount={pageCount} onLeftClick={() => { this.onChangePage(parseInt(page, 10), false); }} onRightClick={() => { this.onChangePage(parseInt(page, 10), true); }}/>
          </Container>
        </div>
        {children}
      </div>

    );
  }

}
