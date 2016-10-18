import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push as routerPush } from 'react-router-redux';
import moment from 'moment';
import Header from '../../app/header';
import { Container, colors, makeTextStyle } from '../../_common/styles';
import { CheckBoxCel, Table, Headers, TextCel, Rows, Row, Pagination } from '../../_common/components/table';
import Radium from 'radium';
import * as actions from './actions';
import selector from './selector';

/* eslint-disable react/no-set-state*/
const numberOfRows = 25;

function determineSortDirection (sortField, query) {
  let sortDirection = actions.NONE;
  if (query.sortField === sortField && query.sortDirection) {
    // map string to number
    sortDirection = actions.sortDirections[query.sortDirection];
  }
  return actions.directionToString((sortDirection + 1) % 3);
}

@connect((state, ownProps) => ({
  ...selector(state, ownProps)
}), (dispatch) => ({
  load: bindActionCreators(actions.load, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  selectAllCheckboxes: bindActionCreators(actions.selectAllCheckboxes, dispatch),
  selectCheckbox: bindActionCreators(actions.selectCheckbox, dispatch)
}))
@Radium
export default class ContentProducers extends Component {

  static propTypes = {
    contentProducers: ImmutablePropTypes.map.isRequired,
    isSelected: ImmutablePropTypes.map.isRequired,
    load: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object.isRequired
    }),
    pageCount: PropTypes.number,
    routerPush: PropTypes.func.isRequired,
    selectAllCheckboxes: PropTypes.func.isRequired,
    selectCheckbox: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
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
      query.sortField !== nextQuery.sortField) {
      this.props.load(nextProps.location.query);
    }
  }

  getName (cp) {
    return cp.get('name');
  }

  getUpdatedBy (cp) {
    return cp.get('lastUpdatedBy');
  }

  getLastUpdatedOn (cp) {
    const date = new Date(cp.get('lastUpdatedOn'));
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

  static styles = {
    header: {
      height: '32px',
      color: colors.darkGray2,
      backgroundColor: colors.white,
      ...makeTextStyle(null, '11px', '0.50px')
    },
    firstHeader: {
      borderBottom: `1px solid ${colors.lightGray2}`
    },
    notFirstHeader: {
      borderLeft: `1px solid ${colors.lightGray2}`,
      borderBottom: `1px solid ${colors.lightGray2}`
    }
  }

  render () {
    const { contentProducers, isSelected, location: { pathname, query: { page, sortField, sortDirection } },
      pageCount, selectAllCheckboxes, selectCheckbox } = this.props;
    const { styles } = this.constructor;
    return (
      <div>
        <Header currentPath={pathname} hideHomePageLinks />
        <Container>
          <Table>
            <Headers>
              {/* Be aware that width or flex of each headerCel and the related rowCel must be the same! */}
              <CheckBoxCel checked={isSelected.get('ALL')} name='header' style={[ styles.header, styles.firstHeader, { flex: 0.25 } ]} onChange={selectAllCheckboxes}/>
              <TextCel sortColumn={this.onSortField.bind(this, 'NAME')} sortDirection = {sortField === 'NAME' ? actions.sortDirections[sortDirection] : actions.NONE} style={[ styles.header, styles.notFirstHeader, { flex: 2 } ]}>NAME</TextCel>
              <TextCel style={[ styles.header, styles.notFirstHeader, { flex: 2 } ]}>UPDATED BY</TextCel>
              <TextCel sortColumn={this.onSortField.bind(this, 'LAST_MODIFIED')} sortDirection = {sortField === 'LAST_MODIFIED' ? actions.sortDirections[sortDirection] : actions.NONE} style={[ styles.header, styles.notFirstHeader, { flex: 2 } ]}>LAST UPDATED ON</TextCel>
            </Headers>
            <Rows isLoading={contentProducers.get('_status') !== 'loaded'}>
              {contentProducers.get('data').map((cp, index) => {
                return (
                  <Row index={index} isFirst={index % numberOfRows === 0} key={index} >
                    {/* Be aware that width or flex of each headerCel and the related rowCel must be the same! */}
                    <CheckBoxCel checked={isSelected.get(cp.get('id'))} style={{ flex: 0.25 }} onChange={selectCheckbox.bind(this, cp.get('id'))}/>
                    <TextCel getValue={this.getName} objectToRender={cp} style={{ flex: 2 }} onClick={() => { }} />
                    <TextCel getValue={this.getUpdatedBy} objectToRender={cp} style={{ flex: 2 }}/>
                    <TextCel getValue={this.getLastUpdatedOn} objectToRender={cp} style={{ flex: 2 }}/>
                  </Row>
                );
              })}
            </Rows>
          </Table>
          <Pagination currentPage={(page && (parseInt(page, 10) + 1) || 1)} pageCount={pageCount} onLeftClick={() => { this.onChangePage(parseInt(page, 10), false); }} onRightClick={() => { this.onChangePage(parseInt(page, 10), true); }}/>
        </Container>
      </div>

    );
  }

}
