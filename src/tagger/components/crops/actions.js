
import { fetchCharactersOfScene } from '../../actions/character';
import { fetchProductsOfScene } from '../../actions/product';
import { searchTopics as dataSearchTopics } from '../../../actions/topic';
import { createSearchAction } from '../../../utils';
import { currentVideoIdSelector } from '../../selectors/common';
import { fetchCrops } from '../../../actions/crop';
import { fetchKeyScenes } from '../../actions/scene';

export const TOPICS_SEARCH_START = 'CROP_EDIT/TOPICS_SEARCH_START';
export const TOPICS_SEARCH_ERROR = 'CROP_EDIT/TOPICS_SEARCH_ERROR';

export const SELECT_FRAME = 'CROP_EDIT/SELECT_FRAME';

export const submit = console.warn;

export const searchTopics = createSearchAction(dataSearchTopics, TOPICS_SEARCH_START, TOPICS_SEARCH_ERROR);

export { deleteCrop, fetchCrop, persistCrop } from '../../../actions/crop';
export { fetchCropTopics, persistTopic } from '../../../actions/topic';
export { fetchTopic as fetchMediumTopic } from '../../../actions/media';

export function selectFrame ({ sceneId }) {
  return { sceneId, type: SELECT_FRAME };
}

export function loadAppearances (sceneId) {
  return async (dispatch) => {
    await dispatch(fetchProductsOfScene({ sceneId }));
    await dispatch(fetchCharactersOfScene({ sceneId }));
    // TODO load persons
  };
}

export function loadCrops () {
  return (dispatch, getState) => {
    const videoId = currentVideoIdSelector(getState());
    dispatch(fetchCrops({ videoId }));
  };
}

export function getKeyScenes (videoId) {
  return async (dispatch) => {
    await dispatch(fetchKeyScenes({ videoId, onlyKeyScenes: true }));
  };
}
