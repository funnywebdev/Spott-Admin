import { CONTENT_PRODUCER_USERS_FETCH_SUCCESS } from '../../../../../../actions/contentProducer';
import { SELECT_ALL_CHECKBOXES, SELECT_CHECKBOX } from './actions';
import createPageReducer from '../../../../../_common/createPageReducer';

export default createPageReducer({ DATA_FETCH_SUCCESS: CONTENT_PRODUCER_USERS_FETCH_SUCCESS, SELECT_ALL_CHECKBOXES, SELECT_CHECKBOX });
