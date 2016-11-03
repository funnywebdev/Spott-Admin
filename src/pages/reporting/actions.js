import moment from 'moment';
import { searchMedia as dataSearchMedia } from '../../actions/media';
import {
  fetchAges, fetchEvents, fetchGenders, fetchProductViews, fetchTimelineData,
  fetchAgeData, fetchBrandSubscriptions, fetchMediumSyncs, fetchMediumSubscriptions,
  fetchGenderData, fetchCharacterSubscriptions
} from '../../actions/reporting';
import { currentAgesSelector, currentGendersSelector, currentMediaSelector } from './selector';

// Action types
// ////////////

export const MEDIA_SEARCH_START = 'REPORTING/MEDIA_SEARCH_START';
export const MEDIA_SEARCH_ERROR = 'REPORTING/MEDIA_SEARCH_ERROR';

export const ACTIVITIES_FETCH_START = 'REPORTING/ACTIVITIES_FETCH_START';
export const ACTIVITIES_FETCH_ERROR = 'REPORTING/ACTIVITIES_FETCH_ERROR';

export const CLEAR_RANKINGS = 'REPORTING/CLEAR_RANKINGS';

export function searchMedia (searchString = '') {
  return async (dispatch, getState) => {
    try {
      dispatch({ searchString, type: MEDIA_SEARCH_START });
      return await dispatch(dataSearchMedia({ searchString }));
    } catch (error) {
      dispatch({ error, searchString, type: MEDIA_SEARCH_ERROR });
    }
  };
}

// Events are for every view the same.
export const loadAges = fetchAges;
export const loadEvents = fetchEvents;
export const loadGenders = fetchGenders;

// export function updateActivitiesLocation () {
//   return async (dispatch, getState) => {
//     const state = getState();
//
//     // Get the current selected media (series/movies/commercials).
//     const mediumIds = mediaFilterSelector(state, 'media');
//
//     // Get the date range and the event type.
//     const eventFilterSelector = formValueSelector('reportingActivityFilter');
//     const { endDate, event, startDate } = eventFilterSelector(state, 'endDate', 'event', 'startDate');
//
//     // Change route.
//     const currentLocation = state.get('router').locationBeforeTransitions;
//     dispatch(routerPush({ ...currentLocation, query: {
//       endDate: endDate.format('YYYY-MM-DD'),
//       event,
//       startDate: startDate.format('YYYY-MM-DD'),
//       mediumIds
//     } }));
//   };
// }

export function loadActivities (query) {
  return async (dispatch) => {
    try {
      if (query && query.endDate && query.event && query.startDate && query.media) {
        const endDate = moment(query.endDate);
        const startDate = moment(query.startDate);
        const eventType = query.event;
        const mediumIds = typeof query.media === 'string' ? [ query.media ] : (query.media || []);

        // We need to load the genders to show in the gender chart.
        await dispatch(loadGenders());
        dispatch(fetchTimelineData({ startDate, endDate, eventType, mediumIds }));
        dispatch(fetchAgeData({ startDate, endDate, eventType, mediumIds }));
        dispatch(fetchGenderData({ startDate, endDate, eventType, mediumIds }));
      }
    } catch (error) {
      dispatch({ error, type: ACTIVITIES_FETCH_ERROR });
    }
  };
}

// export function updateRankingsLocation () {
//   return async (dispatch, getState) => {
//     const state = getState();
//
//     const { ages = [], genders = [] } = rankingsFilterSelector(state, 'ages', 'genders');
//     const mediumIds = mediaFilterSelector(state, 'media') || [];
//
//     // Change route.
//     const currentLocation = state.get('router').locationBeforeTransitions;
//     dispatch(routerPush({ ...currentLocation, query: {
//       ages,
//       genders,
//       mediumIds
//     } }));
//   };
// }

export function loadRankings () {
  return async (dispatch, getState) => {
    const state = getState();

    const ages = currentAgesSelector(state);
    const genders = currentGendersSelector(state);
    const mediumIds = currentMediaSelector(state);

    try {
      dispatch({ type: CLEAR_RANKINGS });
      dispatch(fetchBrandSubscriptions({ ages, genders, mediumIds }));
      dispatch(fetchCharacterSubscriptions({ ages, genders, mediumIds }));
      dispatch(fetchMediumSubscriptions({ ages, genders, mediumIds }));
      dispatch(fetchMediumSyncs({ ages, genders, mediumIds }));
      dispatch(fetchProductViews({ ages, genders, mediumIds }));

      // return await dispatch(dataSearchSeries({ searchString }));
    } catch (error) {
      dispatch({ error, type: ACTIVITIES_FETCH_ERROR });
    }
  };
}

function createLoadRankings (fetch) {
  return (page = 0) => {
    return async (dispatch, getState) => {
      const state = getState();
      const ages = currentAgesSelector(state);
      const genders = currentGendersSelector(state);
      const mediumIds = currentMediaSelector(state);
      return await dispatch(fetch({ ages, genders, mediumIds, page }));
    };
  };
}

export const loadBrandSubscriptions = createLoadRankings(fetchBrandSubscriptions);
export const loadCharacterSubscriptions = createLoadRankings(fetchCharacterSubscriptions);
export const loadMediumSubscriptions = createLoadRankings(fetchMediumSubscriptions);
export const loadMediumSyncs = createLoadRankings(fetchMediumSyncs);
export const loadProductViews = createLoadRankings(fetchProductViews);

// export function initializeRankingsFilterForm (ages, genders) {
//   return async (dispatch, getState) => {
//     const state = getState();
//     const { ages: currentAges, genders: currentGenders } = rankingsFilterSelector(state, 'ages', 'genders');
//
//     if (!currentAges || currentAges.length === 0) {
//       const ageIds = ages.map(({ id }) => id);
//       dispatch(change('reportingRankingsFilter', 'ages', ageIds));
//     }
//
//     if (!currentGenders || currentGenders.length === 0) {
//       const genderIds = genders.map(({ id }) => id);
//       dispatch(change('reportingRankingsFilter', 'genders', genderIds));
//     }
//   };
// }
