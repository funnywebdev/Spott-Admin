import { makeApiActionCreator } from './utils';
import * as broadcastChannelApi from '../api/broadcastChannel';

export const BROADCAST_CHANNEL_UPLOAD_IMAGE_START = 'DATA/BROADCAST_CHANNEL_UPLOAD_IMAGE_START';
export const BROADCAST_CHANNEL_UPLOAD_IMAGE_SUCCESS = 'DATA/BROADCAST_CHANNEL_UPLOAD_IMAGE_SUCCESS';
export const BROADCAST_CHANNEL_UPLOAD_IMAGE_ERROR = 'DATA/BROADCAST_CHANNEL_UPLOAD_IMAGE_ERROR';

export const BROADCAST_CHANNEL_SEARCH_START = 'DATA/BROADCAST_CHANNEL_SEARCH_START';
export const BROADCAST_CHANNEL_SEARCH_SUCCESS = 'DATA/BROADCAST_CHANNEL_SEARCH_SUCCESS';
export const BROADCAST_CHANNEL_SEARCH_ERROR = 'DATA/BROADCAST_CHANNEL_SEARCH_ERROR';

export const BROADCAST_CHANNELS_FETCH_START = 'BROADCAST_CHANNEL/BROADCAST_CHANNELS_FETCH_START';
export const BROADCAST_CHANNELS_FETCH_SUCCESS = 'BROADCAST_CHANNEL/BROADCAST_CHANNELS_FETCH_SUCCESS';
export const BROADCAST_CHANNELS_FETCH_ERROR = 'BROADCAST_CHANNEL/BROADCAST_CHANNELS_FETCH_ERROR';

export const BROADCAST_CHANNEL_FETCH_START = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_FETCH_START';
export const BROADCAST_CHANNEL_FETCH_SUCCESS = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_FETCH_SUCCESS';
export const BROADCAST_CHANNEL_FETCH_ERROR = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_FETCH_ERROR';

export const BROADCAST_CHANNEL_PERSIST_START = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_PERSIST_START';
export const BROADCAST_CHANNEL_PERSIST_SUCCESS = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_PERSIST_SUCCESS';
export const BROADCAST_CHANNEL_PERSIST_ERROR = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_PERSIST_ERROR';

export const BROADCAST_CHANNEL_DELETE_START = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_DELETE_START';
export const BROADCAST_CHANNEL_DELETE_SUCCESS = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_DELETE_SUCCESS';
export const BROADCAST_CHANNEL_DELETE_ERROR = 'BROADCAST_CHANNEL/BROADCAST_CHANNEL_DELETE_ERROR';

export const BROADCAST_CHANNELS_DELETE_START = 'BROADCAST_CHANNEL/BROADCAST_CHANNELS_DELETE_START';
export const BROADCAST_CHANNELS_DELETE_SUCCESS = 'BROADCAST_CHANNEL/BROADCAST_CHANNELS_DELETE_SUCCESS';
export const BROADCAST_CHANNELS_DELETE_ERROR = 'BROADCAST_CHANNEL/BROADCAST_CHANNELS_DELETE_ERROR';

export const LOGO_DELETE_START = 'BROADCAST_CHANNEL/LOGO_DELETE_START';
export const LOGO_DELETE_SUCCESS = 'BROADCAST_CHANNEL/LOGO_DELETE_SUCCESS';
export const LOGO_DELETE_ERROR = 'BROADCAST_CHANNEL/LOGO_DELETE_ERROR';

export const fetchBroadcastChannels = makeApiActionCreator(broadcastChannelApi.fetchBroadcastChannels, BROADCAST_CHANNELS_FETCH_START, BROADCAST_CHANNELS_FETCH_SUCCESS, BROADCAST_CHANNELS_FETCH_ERROR);
export const fetchBroadcastChannel = makeApiActionCreator(broadcastChannelApi.fetchBroadcastChannel, BROADCAST_CHANNEL_FETCH_START, BROADCAST_CHANNEL_FETCH_SUCCESS, BROADCAST_CHANNEL_FETCH_ERROR);
export const persistBroadcastChannel = makeApiActionCreator(broadcastChannelApi.persistBroadcastChannel, BROADCAST_CHANNEL_PERSIST_START, BROADCAST_CHANNEL_PERSIST_SUCCESS, BROADCAST_CHANNEL_PERSIST_ERROR);
export const deleteBroadcastChannels = makeApiActionCreator(broadcastChannelApi.deleteBroadcastChannels, BROADCAST_CHANNELS_DELETE_START, BROADCAST_CHANNELS_DELETE_SUCCESS, BROADCAST_CHANNELS_DELETE_ERROR);
export const deleteBroadcastChannel = makeApiActionCreator(broadcastChannelApi.deleteBroadcastChannel, BROADCAST_CHANNEL_DELETE_START, BROADCAST_CHANNEL_DELETE_SUCCESS, BROADCAST_CHANNEL_DELETE_ERROR);
export const deleteLogo = makeApiActionCreator(broadcastChannelApi.deleteLogo, LOGO_DELETE_START, LOGO_DELETE_SUCCESS, LOGO_DELETE_ERROR);
export const searchBroadcastChannels = makeApiActionCreator(broadcastChannelApi.searchBroadcastChannels, BROADCAST_CHANNEL_SEARCH_START, BROADCAST_CHANNEL_SEARCH_SUCCESS, BROADCAST_CHANNEL_SEARCH_ERROR);
export const uploadBroadcastChannelImage = makeApiActionCreator(broadcastChannelApi.uploadBroadcastChannelImage, BROADCAST_CHANNEL_UPLOAD_IMAGE_START, BROADCAST_CHANNEL_UPLOAD_IMAGE_SUCCESS, BROADCAST_CHANNEL_UPLOAD_IMAGE_ERROR);
