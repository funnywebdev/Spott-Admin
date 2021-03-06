import * as api from '../api/character';
import { makeApiActionCreator } from './utils';

export const CHARACTER_SEARCH_START = 'CHARACTER/CHARACTER_SEARCH_START';
export const CHARACTER_SEARCH_SUCCESS = 'CHARACTER/CHARACTER_SEARCH_SUCCESS';
export const CHARACTER_SEARCH_ERROR = 'CHARACTER/CHARACTER_SEARCH_ERROR';

export const MEDIUM_CHARACTER_SEARCH_START = 'CHARACTER/MEDIUM_CHARACTER_SEARCH_START';
export const MEDIUM_CHARACTER_SEARCH_SUCCESS = 'CHARACTER/MEDIUM_CHARACTER_SEARCH_SUCCESS';
export const MEDIUM_CHARACTER_SEARCH_ERROR = 'CHARACTER/MEDIUM_CHARACTER_SEARCH_ERROR';

export const MEDIUM_CHARACTER_PERSIST_START = 'CHARACTER/MEDIUM_CHARACTER_PERSIST_START';
export const MEDIUM_CHARACTER_PERSIST_SUCCESS = 'CHARACTER/MEDIUM_CHARACTER_PERSIST_SUCCESS';
export const MEDIUM_CHARACTER_PERSIST_ERROR = 'CHARACTER/MEDIUM_CHARACTER_PERSIST_ERROR';

export const MEDIUM_CHARACTER_DELETE_START = 'CHARACTER/MEDIUM_CHARACTER_DELETE_START';
export const MEDIUM_CHARACTER_DELETE_SUCCESS = 'CHARACTER/MEDIUM_CHARACTER_DELETE_SUCCESS';
export const MEDIUM_CHARACTER_DELETE_ERROR = 'CHARACTER/MEDIUM_CHARACTER_DELETE_ERROR';

export const CHARACTERS_FETCH_START = 'CHARACTER/CHARACTERS_FETCH_START';
export const CHARACTERS_FETCH_SUCCESS = 'CHARACTER/CHARACTERS_FETCH_SUCCESS';
export const CHARACTERS_FETCH_ERROR = 'CHARACTER/CHARACTERS_FETCH_ERROR';

export const CHARACTER_FETCH_START = 'CHARACTER/CHARACTER_FETCH_START';
export const CHARACTER_FETCH_SUCCESS = 'CHARACTER/CHARACTER_FETCH_SUCCESS';
export const CHARACTER_FETCH_ERROR = 'CHARACTER/CHARACTER_FETCH_ERROR';

export const CHARACTER_FACE_IMAGES_FETCH_START = 'CHARACTER/CHARACTER_FACE_IMAGES_FETCH_START';
export const CHARACTER_FACE_IMAGES_FETCH_SUCCESS = 'CHARACTER/CHARACTER_FACE_IMAGES_FETCH_SUCCESS';
export const CHARACTER_FACE_IMAGES_FETCH_ERROR = 'CHARACTER/CHARACTER_FACE_IMAGES_FETCH_ERROR';

export const CHARACTER_DELETE_START = 'CHARACTER/CHARACTER_DELETE_START';
export const CHARACTER_DELETE_SUCCESS = 'CHARACTER/CHARACTER_DELETE_SUCCESS';
export const CHARACTER_DELETE_ERROR = 'CHARACTER/CHARACTER_DELETE_ERROR';

export const CHARACTERS_DELETE_START = 'CHARACTER/CHARACTERS_DELETE_START';
export const CHARACTERS_DELETE_SUCCESS = 'CHARACTER/CHARACTERS_DELETE_SUCCESS';
export const CHARACTERS_DELETE_ERROR = 'CHARACTER/CHARACTERS_DELETE_ERROR';

export const CHARACTER_PERSIST_START = 'CHARACTER/CHARACTER_PERSIST_START';
export const CHARACTER_PERSIST_SUCCESS = 'CHARACTER/CHARACTER_PERSIST_SUCCESS';
export const CHARACTER_PERSIST_ERROR = 'CHARACTER/CHARACTER_PERSIST_ERROR';

export const UPLOAD_PORTRAIT_IMAGE_START = 'CHARACTER/UPLOAD_PORTRAIT_IMAGE_START';
export const UPLOAD_PORTRAIT_IMAGE_SUCCESS = 'CHARACTER/UPLOAD_PORTRAIT_IMAGE_SUCCESS';
export const UPLOAD_PORTRAIT_IMAGE_ERROR = 'CHARACTER/UPLOAD_PORTRAIT_IMAGE_ERROR';

export const UPLOAD_PROFILE_IMAGE_START = 'CHARACTER/UPLOAD_PROFILE_IMAGE_START';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'CHARACTER/UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_ERROR = 'CHARACTER/UPLOAD_PROFILE_IMAGE_ERROR';

export const UPLOAD_FACE_IMAGE_START = 'CHARACTER/UPLOAD_FACE_IMAGE_START';
export const UPLOAD_FACE_IMAGE_SUCCESS = 'CHARACTER/UPLOAD_FACE_IMAGE_SUCCESS';
export const UPLOAD_FACE_IMAGE_ERROR = 'CHARACTER/UPLOAD_FACE_IMAGE_ERROR';

export const DELETE_FACE_IMAGE_START = 'CHARACTER/DELETE_FACE_IMAGE_START';
export const DELETE_FACE_IMAGE_SUCCESS = 'CHARACTER/DELETE_FACE_IMAGE_SUCCESS';
export const DELETE_FACE_IMAGE_ERROR = 'CHARACTER/DELETE_FACE_IMAGE_ERROR';

export const DELETE_PROFILE_IMAGE_START = 'CHARACTER/DELETE_PROFILE_IMAGE_START';
export const DELETE_PROFILE_IMAGE_SUCCESS = 'CHARACTER/DELETE_PROFILE_IMAGE_SUCCESS';
export const DELETE_PROFILE_IMAGE_ERROR = 'CHARACTER/DELETE_PROFILE_IMAGE_ERROR';

export const DELETE_POSTER_IMAGE_START = 'CHARACTER/DELETE_POSTER_IMAGE_START';
export const DELETE_POSTER_IMAGE_SUCCESS = 'CHARACTER/DELETE_POSTER_IMAGE_SUCCESS';
export const DELETE_POSTER_IMAGE_ERROR = 'CHARACTER/DELETE_POSTER_IMAGE_ERROR';

export const TOPIC_FETCH_START = 'CHARACTER/TOPIC_FETCH_START';
export const TOPIC_FETCH_SUCCESS = 'CHARACTER/TOPIC_FETCH_SUCCESS';
export const TOPIC_FETCH_ERROR = 'CHARACTER/TOPIC_FETCH_ERROR';

export const deletePortraitImage = makeApiActionCreator(api.deletePortraitImage, DELETE_POSTER_IMAGE_START, DELETE_POSTER_IMAGE_SUCCESS, DELETE_POSTER_IMAGE_ERROR);
export const deleteProfileImage = makeApiActionCreator(api.deleteProfileImage, DELETE_PROFILE_IMAGE_START, DELETE_PROFILE_IMAGE_SUCCESS, DELETE_PROFILE_IMAGE_ERROR);
export const deleteCharacters = makeApiActionCreator(api.deleteCharacters, CHARACTERS_DELETE_START, CHARACTERS_DELETE_SUCCESS, CHARACTERS_DELETE_ERROR);
export const deleteCharacter = makeApiActionCreator(api.deleteCharacter, CHARACTER_DELETE_START, CHARACTER_DELETE_SUCCESS, CHARACTER_DELETE_ERROR);
export const deleteFaceImage = makeApiActionCreator(api.deleteFaceImage, DELETE_FACE_IMAGE_START, DELETE_FACE_IMAGE_SUCCESS, DELETE_FACE_IMAGE_ERROR);
export const fetchCharacters = makeApiActionCreator(api.fetchCharacters, CHARACTERS_FETCH_START, CHARACTERS_FETCH_SUCCESS, CHARACTERS_FETCH_ERROR);
export const fetchCharacter = makeApiActionCreator(api.fetchCharacter, CHARACTER_FETCH_START, CHARACTER_FETCH_SUCCESS, CHARACTER_FETCH_ERROR);
export const fetchFaceImages = makeApiActionCreator(api.fetchFaceImages, CHARACTER_FACE_IMAGES_FETCH_START, CHARACTER_FACE_IMAGES_FETCH_SUCCESS, CHARACTER_FACE_IMAGES_FETCH_ERROR);
export const persistCharacter = makeApiActionCreator(api.persistCharacter, CHARACTER_PERSIST_START, CHARACTER_PERSIST_SUCCESS, CHARACTER_PERSIST_ERROR);
export const searchCharacters = makeApiActionCreator(api.searchCharacters, CHARACTER_SEARCH_START, CHARACTER_SEARCH_SUCCESS, CHARACTER_SEARCH_ERROR);
export const searchMediumCharacters = makeApiActionCreator(api.searchMediumCharacters, MEDIUM_CHARACTER_SEARCH_START, MEDIUM_CHARACTER_SEARCH_SUCCESS, MEDIUM_CHARACTER_SEARCH_ERROR);
export const persistMediumCharacter = makeApiActionCreator(api.persistMediumCharacter, MEDIUM_CHARACTER_PERSIST_START, MEDIUM_CHARACTER_PERSIST_SUCCESS, MEDIUM_CHARACTER_PERSIST_ERROR);
export const deleteMediumCharacter = makeApiActionCreator(api.deleteMediumCharacter, MEDIUM_CHARACTER_DELETE_START, MEDIUM_CHARACTER_DELETE_SUCCESS, MEDIUM_CHARACTER_DELETE_ERROR);
export const uploadPortraitImage = makeApiActionCreator(api.uploadPortraitImage, UPLOAD_PORTRAIT_IMAGE_START, UPLOAD_PORTRAIT_IMAGE_SUCCESS, UPLOAD_PORTRAIT_IMAGE_ERROR);
export const uploadProfileImage = makeApiActionCreator(api.uploadProfileImage, UPLOAD_PROFILE_IMAGE_START, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_ERROR);
export const uploadFaceImage = makeApiActionCreator(api.uploadFaceImage, UPLOAD_FACE_IMAGE_START, UPLOAD_FACE_IMAGE_SUCCESS, UPLOAD_FACE_IMAGE_ERROR);
export const fetchTopic = makeApiActionCreator(api.fetchTopic, TOPIC_FETCH_START, TOPIC_FETCH_SUCCESS, TOPIC_FETCH_ERROR);
