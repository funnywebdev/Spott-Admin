import { makeApiActionCreator } from './utils';
import * as seasonsApi from '../api/season';

export const EPISODES_SEARCH_START = 'SEASONS/EPISODES_SEARCH_START';
export const EPISODES_SEARCH_SUCCESS = 'SEASONS/EPISODES_SEARCH_SUCCESS';
export const EPISODES_SEARCH_ERROR = 'SEASONS/EPISODES_SEARCH_ERROR';

export const SEASONS_FETCH_START = 'SEASONS/SEASONS_FETCH_START';
export const SEASONS_FETCH_SUCCESS = 'SEASONS/SEASONS_FETCH_SUCCESS';
export const SEASONS_FETCH_ERROR = 'SEASONS/SEASONS_FETCH_ERROR';

export const SEASON_FETCH_START = 'SEASONS/SEASON_FETCH_START';
export const SEASON_FETCH_SUCCESS = 'SEASONS/SEASON_FETCH_SUCCESS';
export const SEASON_FETCH_ERROR = 'SEASONS/SEASON_FETCH_ERROR';

export const LAST_EPISODE_FETCH_START = 'SEASONS/LAST_EPISODE_FETCH_START';
export const LAST_EPISODE_FETCH_SUCCESS = 'SEASONS/LAST_EPISODE_FETCH_SUCCESS';
export const LAST_EPISODE_FETCH_ERROR = 'SEASONS/LAST_EPISODE_FETCH_ERROR';

export const SEASON_PERSIST_START = 'SEASONS/SEASON_PERSIST_START';
export const SEASON_PERSIST_SUCCESS = 'SEASONS/SEASON_PERSIST_SUCCESS';
export const SEASON_PERSIST_ERROR = 'SEASONS/SEASON_PERSIST_ERROR';

export const SEASON_DELETE_START = 'SEASONS/SEASON_DELETE_START';
export const SEASON_DELETE_SUCCESS = 'SEASONS/SEASON_DELETE_SUCCESS';
export const SEASON_DELETE_ERROR = 'SEASONS/SEASON_DELETE_ERROR';

export const SEASONS_DELETE_START = 'SEASONS/SEASONS_DELETE_START';
export const SEASONS_DELETE_SUCCESS = 'SEASONS/SEASONS_DELETE_SUCCESS';
export const SEASONS_DELETE_ERROR = 'SEASONS/SEASONS_DELETE_ERROR';

export const SEASON_EPISODES_FETCH_START = 'SEASONS/SEASON_EPISODES_FETCH_START';
export const SEASON_EPISODES_FETCH_SUCCESS = 'SEASONS/SEASON_EPISODES_FETCH_SUCCESS';
export const SEASON_EPISODES_FETCH_ERROR = 'SEASONS/SEASON_EPISODES_FETCH_ERROR';

export const UPLOAD_POSTER_IMAGE_START = 'SEASONS/UPLOAD_POSTER_IMAGE_START';
export const UPLOAD_POSTER_IMAGE_SUCCESS = 'SEASONS/UPLOAD_POSTER_IMAGE_SUCCESS';
export const UPLOAD_POSTER_IMAGE_ERROR = 'SEASONS/UPLOAD_POSTER_IMAGE_ERROR';

export const UPLOAD_PROFILE_IMAGE_START = 'SEASONS/UPLOAD_PROFILE_IMAGE_START';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'SEASONS/UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_ERROR = 'SEASONS/UPLOAD_PROFILE_IMAGE_ERROR';

/**
 * @param {Object} params
 * @param {string} params.searchString Lowercase search string.
 */
export const fetchSeasonEpisodes = makeApiActionCreator(seasonsApi.fetchSeasonEpisodes, SEASON_EPISODES_FETCH_START, SEASON_EPISODES_FETCH_SUCCESS, SEASON_EPISODES_FETCH_ERROR);
export const fetchSeasons = makeApiActionCreator(seasonsApi.fetchSeasons, SEASONS_FETCH_START, SEASONS_FETCH_SUCCESS, SEASONS_FETCH_ERROR);
export const fetchSeason = makeApiActionCreator(seasonsApi.fetchSeason, SEASON_FETCH_START, SEASON_FETCH_SUCCESS, SEASON_FETCH_ERROR);
export const fetchLastEpisode = makeApiActionCreator(seasonsApi.fetchLastEpisode, LAST_EPISODE_FETCH_START, LAST_EPISODE_FETCH_SUCCESS, LAST_EPISODE_FETCH_ERROR);
export const persistSeason = makeApiActionCreator(seasonsApi.persistSeason, SEASON_PERSIST_START, SEASON_PERSIST_SUCCESS, SEASON_PERSIST_ERROR);
export const deleteSeasons = makeApiActionCreator(seasonsApi.deleteSeasons, SEASONS_DELETE_START, SEASONS_DELETE_SUCCESS, SEASONS_DELETE_ERROR);
export const deleteSeason = makeApiActionCreator(seasonsApi.deleteSeason, SEASON_DELETE_START, SEASON_DELETE_SUCCESS, SEASON_DELETE_ERROR);
export const searchEpisodes = makeApiActionCreator(seasonsApi.searchEpisodes, EPISODES_SEARCH_START, EPISODES_SEARCH_SUCCESS, EPISODES_SEARCH_ERROR);
export const uploadPosterImage = makeApiActionCreator(seasonsApi.uploadPosterImage, UPLOAD_POSTER_IMAGE_START, UPLOAD_POSTER_IMAGE_SUCCESS, UPLOAD_POSTER_IMAGE_ERROR);
export const uploadProfileImage = makeApiActionCreator(seasonsApi.uploadProfileImage, UPLOAD_PROFILE_IMAGE_START, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_ERROR);
