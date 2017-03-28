import { persistSpott, fetchSpott as dataFetchSpott } from '../../../../actions/spott';
import { searchTopics as dataSearchTopics } from '../../../../actions/topic';
import { fetchCountries } from '../../../../actions/country';
import { fetchLanguages } from '../../../../actions/language';
import { createSearchAction } from '../../../../utils';

export const SPOTT_FETCH_ENTRY_ERROR = 'SPOTTS_EDIT/FETCH_ENTRY_ERROR';
export const CLOSE_POP_UP_MESSAGE = 'SPOTTS_EDIT/CLOSE_POP_UP_MESSAGE';

export const TOPICS_SEARCH_START = 'SPOTT_EDIT/TOPICS_SEARCH_START';
export const TOPICS_SEARCH_ERROR = 'SPOTT_EDIT/TOPICS_SEARCH_ERROR';

export const AUDIENCE_COUNTRIES_SEARCH_START = 'SPOTTS_EDIT/AUDIENCE_COUNTRIES_SEARCH_START';
export const AUDIENCE_COUNTRIES_SEARCH_ERROR = 'SPOTTS_EDIT/AUDIENCE_COUNTRIES_SEARCH_ERROR';

export const AUDIENCE_LANGUAGES_SEARCH_START = 'SPOTTS_EDIT/AUDIENCE_LANGUAGES_SEARCH_START';
export const AUDIENCE_LANGUAGES_SEARCH_ERROR = 'SPOTTS_EDIT/AUDIENCE_LANGUAGES_SEARCH_ERROR';

export { openModal, closeModal } from '../../../../actions/global';

export const submit = persistSpott;

export const searchTopics = createSearchAction(dataSearchTopics, TOPICS_SEARCH_START, TOPICS_SEARCH_ERROR);

export function closePopUpMessage () {
  return { type: CLOSE_POP_UP_MESSAGE };
}

export function loadSpott (spottId) {
  return async (dispatch, getState) => {
    try {
      return await dispatch(dataFetchSpott({ spottId }));
    } catch (error) {
      dispatch({ error, type: SPOTT_FETCH_ENTRY_ERROR });
    }
  };
}

// Audience
// ////////

export const searchAudienceCountries = createSearchAction(fetchCountries, AUDIENCE_COUNTRIES_SEARCH_START, AUDIENCE_COUNTRIES_SEARCH_ERROR);
export const searchAudienceLanguages = createSearchAction(fetchLanguages, AUDIENCE_LANGUAGES_SEARCH_START, AUDIENCE_LANGUAGES_SEARCH_ERROR);