import { fromJS, Map } from 'immutable';
import { BRANDS_SEARCH_START, CLEAR_BRAND_DASHBOARD } from './actions';
import * as actions from '../../../actions/brandDashboard';
import { fetchError, fetchStart, fetchSuccess } from '../../../reducers/utils';

export default (state = fromJS({
  ageData: {},
  dateData: {},
  genderData: {},
  keyMetrics: {},
  locationData: {}
}), action) => {
  switch (action.type) {

    case BRANDS_SEARCH_START:
      return state.set('currentBrandsSearchString', action.searchString);

    case CLEAR_BRAND_DASHBOARD:
      return state
        .setIn([ 'keyMetrics' ], Map());

    case actions.KEY_METRICS_FETCH_START:
      return fetchStart(state, [ 'keyMetrics' ]);
    case actions.KEY_METRICS_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'keyMetrics' ], action.data);
    case actions.KEY_METRICS_FETCH_ERROR:
      return fetchError(state, [ 'keyMetrics' ], action.error);

    case actions.DATE_DATA_FETCH_START:
      return fetchStart(state, [ 'dateData' ]);
    case actions.DATE_DATA_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'dateData' ], action.data);
    case actions.DATE_DATA_FETCH_ERROR:
      return fetchError(state, [ 'dateData' ], action.error);

    case actions.LOCATION_DATA_FETCH_START:
      return fetchStart(state, [ 'locationData' ]);
    case actions.LOCATION_DATA_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'locationData' ], action.data);
    case actions.LOCATION_DATA_FETCH_ERROR:
      return fetchError(state, [ 'locationData' ], action.error);

    case actions.AGE_DATA_FETCH_START:
      return fetchStart(state, [ 'ageData' ]);
    case actions.AGE_DATA_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'ageData' ], action.data);
    case actions.AGE_DATA_FETCH_ERROR:
      return fetchError(state, [ 'ageData' ], action.error);

    case actions.GENDER_DATA_FETCH_START:
      return fetchStart(state, [ 'genderData' ]);
    case actions.GENDER_DATA_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'genderData' ], action.data);
    case actions.GENDER_DATA_FETCH_ERROR:
      return fetchError(state, [ 'genderData' ], action.error);

    // Uninteresting actions
    default:
      return state;

  }
};
