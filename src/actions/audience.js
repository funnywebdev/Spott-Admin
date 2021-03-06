import { makeApiActionCreator } from './utils';
import * as audienceApi from '../api/audience';

export const AUDIENCE_FETCH_START = 'AUDIENCE/AUDIENCE_FETCH_START';
export const AUDIENCE_FETCH_SUCCESS = 'AUDIENCE/AUDIENCE_FETCH_SUCCESS';
export const AUDIENCE_FETCH_ERROR = 'AUDIENCE/AUDIENCE_FETCH_ERROR';

export const AUDIENCES_FETCH_START = 'AUDIENCE/AUDIENCES_FETCH_START';
export const AUDIENCES_FETCH_SUCCESS = 'AUDIENCE/AUDIENCES_FETCH_SUCCESS';
export const AUDIENCES_FETCH_ERROR = 'AUDIENCE/AUDIENCES_FETCH_ERROR';

export const AUDIENCE_PERSIST_START = 'AUDIENCE/AUDIENCE_PERSIST_START';
export const AUDIENCE_PERSIST_SUCCESS = 'AUDIENCE/AUDIENCE_PERSIST_SUCCESS';
export const AUDIENCE_PERSIST_ERROR = 'AUDIENCE/AUDIENCE_PERSIST_ERROR';

export const AUDIENCE_DELETE_START = 'AUDIENCE/AUDIENCE_DELETE_START';
export const AUDIENCE_DELETE_SUCCESS = 'AUDIENCE/AUDIENCE_DELETE_SUCCESS';
export const AUDIENCE_DELETE_ERROR = 'AUDIENCE/AUDIENCE_DELETE_ERROR';

export const fetchAudience = makeApiActionCreator(audienceApi.fetchAudience, AUDIENCE_FETCH_START, AUDIENCE_FETCH_SUCCESS, AUDIENCE_FETCH_ERROR);
export const fetchAudiences = makeApiActionCreator(audienceApi.fetchAudiences, AUDIENCES_FETCH_START, AUDIENCES_FETCH_SUCCESS, AUDIENCES_FETCH_ERROR);
export const persistAudience = makeApiActionCreator(audienceApi.persistAudience, AUDIENCE_PERSIST_START, AUDIENCE_PERSIST_SUCCESS, AUDIENCE_PERSIST_ERROR);
export const deleteAudience = makeApiActionCreator(audienceApi.deleteAudience, AUDIENCE_DELETE_START, AUDIENCE_DELETE_SUCCESS, AUDIENCE_DELETE_ERROR);
