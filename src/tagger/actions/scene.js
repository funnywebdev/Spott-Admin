/* eslint-disable prefer-const */
import {
  CURRENT_SCENE_UPDATE,
  SCENE_UPDATE_START, SCENE_UPDATE_SUCCESS, SCENE_UPDATE_ERROR,
  SCENE_SELECT_START, SCENE_SELECT_SUCCESS, SCENE_SELECT_ERROR,
  TOGGLE_HIDE_DIFFERENT_FRAMES, SELECT_SIMILAR_SCENE
} from '../constants/actionTypes';
import { fetchCharactersOfScene, fetchCharacters } from './character';
import { fetchProductsOfScene, fetchProducts } from './product';
import { getScenes, postScene } from '../api/scene';
import { makeApiActionCreator, updateRecordStart, updateRecordSuccess, updateRecordError } from '../actions/_utils';
import {
  currentSceneSelector,
  currentSceneIdSelector,
  currentVideoIdSelector
} from '../selectors/common';
import { scenesSelector } from '../selectors/sceneSelector';
import { apiBaseUrlSelector, authenticationTokenSelector, currentLocaleSelector } from '../../selectors/global';

export const SCENES_FETCH_START = 'SCENE/SCENES_FETCH_START';
export const SCENES_FETCH_SUCCESS = 'SCENE/SCENES_FETCH_SUCCESS';
export const SCENES_FETCH_ERROR = 'SCENE/SCENES_FETCH_ERROR';

export const fetchScenes = makeApiActionCreator(getScenes, SCENES_FETCH_START, SCENES_FETCH_SUCCESS, SCENES_FETCH_ERROR);

export const KEYSCENES_FETCH_START = 'SCENE/KEYSCENES_FETCH_START';
export const KEYSCENES_FETCH_SUCCESS = 'SCENE/KEYSCENES_FETCH_SUCCESS';
export const KEYSCENES_FETCH_ERROR = 'SCENE/KEYSCENES_FETCH_ERROR';

export const fetchKeyScenes = makeApiActionCreator(getScenes, KEYSCENES_FETCH_START, KEYSCENES_FETCH_SUCCESS, KEYSCENES_FETCH_ERROR);

// Helper functions
// ----------------

function getSceneRelativeToCurrentScene (state, indexJump) {
  const scenes = scenesSelector(state);
  const currentScene = currentSceneSelector(state);

  // Determine the number of scenes.
  const numScenes = scenes.size;
  // Get the index of the current scene in the list of scenes.
  const currentSceneIndex = scenes.indexOf(currentScene);
  // Jump to the left or right scene, according the the indexJump argument.
  // indexJump = 1 means, jump to the right, indexJump = -1 means jump to the left.
  // If there is no left scene, take the last scene. If there is no right scene,
  // take the first scene (like a circle).
  const newSceneIndex = ((currentSceneIndex + indexJump) + numScenes) % numScenes;
  // Retrieve the new selected scene from the entities Map.
  return scenes.get(newSceneIndex);
}

export function getNextScene (state, scene) {
  const scenes = scenesSelector(state);
  const currentScene = currentSceneSelector(state);

  // Get the index of the current scene in the list of scenes.
  const currentSceneIndex = scenes.indexOf(scene || currentScene);
  // Jump to the right scene, if there is no right scene, jump to the left scene.
  const nextScene = scenes.get(currentSceneIndex + 1) || scenes.get(currentSceneIndex - 1);
  return currentScene === nextScene ? null : nextScene;
}

// Select the scene
// ----------------

function updateCurrentScene (scene) {
  return { record: scene, type: CURRENT_SCENE_UPDATE };
}

/**
 * Combined action creator for selecting a scene, fetching its characters, and
 * fetching its products. If one of these actions fails, the state is restored
 * in the app reducer which will handle it in the SCENE_SELECT_ERROR action.
 * @param {Object} scene An Immutable Map, representing the scene to select.
 * @return {Object} An object with types, payload and sequene, used by the
 * redux-combine-actions redux middleware.
 */
export function select (scene) {
  return async (dispatch, getState) => {
    dispatch({ type: SCENE_SELECT_START });
    try {
      await dispatch(updateCurrentScene(scene));
      await dispatch(fetchCharactersOfScene({ sceneId: scene.get('id') }));
      await dispatch(fetchProductsOfScene({ sceneId: scene.get('id') }));
      await dispatch(fetchCharacters());
      await dispatch(fetchProducts());
      return dispatch({ type: SCENE_SELECT_SUCCESS });
    } catch (error) {
      return dispatch({ error, type: SCENE_SELECT_ERROR });
    }
  };
  // return {
  //   types: [ SCENE_SELECT_START, SCENE_SELECT_SUCCESS, SCENE_SELECT_ERROR ],
  //   payload: [
  //     // Update the currentSceneId.
  //     updateCurrentScene.bind(null, scene),
  //     fetchCharactersOfScene,
  //     fetchProductsOfScene,
  //     fetchCharacters,
  //     fetchProducts
  //   ],
  //   sequence: true
  // };
}

/**
 * Combined action creator for selecting the first scene.
 */
export function selectFirstScene () {
  return async (dispatch, getState) => {
    const state = getState();
    const firstScene = scenesSelector(state).first();

    // If all frames are hidden, there is no first scene to select.
    if (firstScene) {
      // If the action returns an error we throw it, so it
      // can be handled by the select video combined action.
      const action = await dispatch(select(firstScene));
      if (action.error) {
        throw action.payload;
      }
    }
  };
}

export function selectLeftScene () {
  return (dispatch, getState) => {
    const leftScene = getSceneRelativeToCurrentScene(getState(), -1);
    dispatch(select(leftScene));
  };
}

export function selectRightScene () {
  return (dispatch, getState) => {
    const rightScene = getSceneRelativeToCurrentScene(getState(), 1);
    dispatch(select(rightScene));
  };
}

export function toggleHideDifferentFrames () {
  return { type: TOGGLE_HIDE_DIFFERENT_FRAMES };
}

export function updateStatusScene (status) {
  return async (dispatch, getState) => {
    let state = getState();
    let authenticationToken = authenticationTokenSelector(state);
    const apiBaseUrl = apiBaseUrlSelector(state);
    const locale = currentLocaleSelector(state);
    let currentScene = currentSceneSelector(state);
    let args = {
      videoId: currentVideoIdSelector(state),
      sceneId: currentSceneIdSelector(state)
    };

    dispatch(updateRecordStart(SCENE_UPDATE_START, currentScene, args));

    try {
      let updatedScene = await postScene(apiBaseUrl, authenticationToken, locale, args, { status });
      dispatch(updateRecordSuccess(SCENE_UPDATE_SUCCESS, updatedScene, args));
    } catch (error) {
      dispatch(updateRecordError(SCENE_UPDATE_ERROR, error, args));
    }
  };
}

export function selectSimilarScene (scene) {
  return (dispatch, getState) => {
    const state = getState();
    const currentSceneId = currentSceneIdSelector(state);
    dispatch({ currentSceneId, scene, type: SELECT_SIMILAR_SCENE });
  };
}
// export function getKeyScenes (videoId) {
//   return async (dispatch) => {
//     await dispatch(fetchKeyScenes({ videoId, onlyKeyScenes: true }));
//   };
// }
