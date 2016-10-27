import * as api from '../api/contentProducer';
import { makeApiActionCreator } from './utils';

export const CONTENT_PRODUCER_FETCH_START = 'CONTENT_PRODUCER/CONTENT_PRODUCER_FETCH_START';
export const CONTENT_PRODUCER_FETCH_SUCCESS = 'CONTENT_PRODUCER/CONTENT_PRODUCER_FETCH_SUCCESS';
export const CONTENT_PRODUCER_FETCH_ERROR = 'CONTENT_PRODUCER/CONTENT_PRODUCER_FETCH_ERROR';

export const CONTENT_PRODUCER_ENTRY_FETCH_START = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_FETCH_START';
export const CONTENT_PRODUCER_ENTRY_FETCH_SUCCESS = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_FETCH_SUCCESS';
export const CONTENT_PRODUCER_ENTRY_FETCH_ERROR = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_FETCH_ERROR';

export const CONTENT_PRODUCER_ENTRY_PERSIST_START = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_PERSIST_START';
export const CONTENT_PRODUCER_ENTRY_PERSIST_SUCCESS = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_PERSIST_SUCCESS';
export const CONTENT_PRODUCER_ENTRY_PERSIST_ERROR = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_PERSIST_ERROR';

export const CONTENT_PRODUCER_ENTRY_DELETE_START = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_DELETE_START';
export const CONTENT_PRODUCER_ENTRY_DELETE_SUCCESS = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_DELETE_SUCCESS';
export const CONTENT_PRODUCER_ENTRY_DELETE_ERROR = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRY_DELETE_ERROR';

export const CONTENT_PRODUCER_ENTRIES_DELETE_START = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRIES_DELETE_START';
export const CONTENT_PRODUCER_ENTRIES_DELETE_SUCCESS = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRIES_DELETE_SUCCESS';
export const CONTENT_PRODUCER_ENTRIES_DELETE_ERROR = 'CONTENT_PRODUCER/CONTENT_PRODUCER_ENTRIES_DELETE_ERROR';

export const fetchContentProducers = makeApiActionCreator(api.fetchContentProducers, CONTENT_PRODUCER_FETCH_START, CONTENT_PRODUCER_FETCH_SUCCESS, CONTENT_PRODUCER_FETCH_ERROR);
export const fetchContentProducerEntry = makeApiActionCreator(api.fetchContentProducerEntry, CONTENT_PRODUCER_ENTRY_FETCH_START, CONTENT_PRODUCER_ENTRY_FETCH_SUCCESS, CONTENT_PRODUCER_ENTRY_FETCH_ERROR);
export const persistContentProducerEntry = makeApiActionCreator(api.persistContentProducer, CONTENT_PRODUCER_ENTRY_PERSIST_START, CONTENT_PRODUCER_ENTRY_PERSIST_SUCCESS, CONTENT_PRODUCER_ENTRY_PERSIST_ERROR);
export const deleteContentProducerEntries = makeApiActionCreator(api.deleteContentProducerEntries, CONTENT_PRODUCER_ENTRIES_DELETE_START, CONTENT_PRODUCER_ENTRIES_DELETE_SUCCESS, CONTENT_PRODUCER_ENTRIES_DELETE_ERROR);
export const deleteContentProducerEntry = makeApiActionCreator(api.deleteContentProducerEntry, CONTENT_PRODUCER_ENTRY_DELETE_START, CONTENT_PRODUCER_ENTRY_DELETE_SUCCESS, CONTENT_PRODUCER_ENTRY_DELETE_ERROR);
