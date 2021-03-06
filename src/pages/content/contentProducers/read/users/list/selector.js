import { createStructuredSelector } from 'reselect';
import { createEntitiesByRelationSelector, usersEntitiesSelector, filterHasUsersRelationsSelector } from '../../../../../../selectors/data';
import { serializeFilterHasUsers } from '../../../../../../../src/reducers/utils';
import { getInformationFromQuery } from '../../../../../_common/components/table/index';
import { prefix } from './index';

export const isSelectedSelector = (state) => state.getIn([ 'content', 'contentProducers', 'read', 'users', 'isSelected' ]);
export const pageCountSelector = (state) => state.getIn([ 'content', 'contentProducers', 'read', 'users', 'pageCount' ]);
export const totalResultCountSelector = (state) => state.getIn([ 'content', 'contentProducers', 'read', 'users', 'totalResultCount' ]);

// second argument of serializeFilterHasUsers is a unique key, specific for this table.
// general users <-> users of content producer
export const usersFilterKeySelector = (state, props) => { return serializeFilterHasUsers(getInformationFromQuery(props.location.query, prefix), 'contentProducers'); };

export const usersSelector = createEntitiesByRelationSelector(
  filterHasUsersRelationsSelector,
  usersFilterKeySelector,
  usersEntitiesSelector
);

export default createStructuredSelector({
  users: usersSelector,
  isSelected: isSelectedSelector,
  pageCount: pageCountSelector,
  totalResultCount: totalResultCountSelector
});
