import { createSelector, createStructuredSelector } from 'reselect';
import { getFormValues } from 'redux-form/immutable';
import {
  broadcastChannelsEntitiesSelector,
  createEntityByIdSelector,
  createEntityIdsByRelationSelector,
  seasonHasEpisodesRelationsSelector,
  seriesEntryHasSeasonsRelationsSelector,
  listMediaEntitiesSelector,
  searchStringHasMediaRelationsSelector,
  searchStringHasBroadcastChannelsRelationsSelector
} from '../../../selectors/data';

const formSelector = getFormValues('tvGuideCreateEntry');

export const currentMediumIdSelector = createSelector(
  formSelector,
  (form) => form && form.get('mediumId')
);
export const currentSeasonIdSelector = createSelector(
  formSelector,
  (form) => form && form.get('seasonId')
);

const currentMediumSelector = createEntityByIdSelector(listMediaEntitiesSelector, currentMediumIdSelector);

export const currentBroadcastChannelsSearchStringSelector = (state) => state.getIn([ 'tvGuide', 'create', 'currentBroadcastChannelsSearchString' ]);
export const currentEpisodesSearchStringSelector = (state) => state.getIn([ 'tvGuide', 'create', 'currentEpisodesSearchString' ]);
export const currentSeasonsSearchStringSelector = (state) => state.getIn([ 'tvGuide', 'create', 'currentSeasonsSearchString' ]);
export const currentMediaSearchStringSelector = (state) => state.getIn([ 'tvGuide', 'create', 'currentMediaSearchString' ]);
export const popUpMessageSelector = (state) => state.getIn([ 'tvGuide', 'create', 'popUpMessage' ]);

export const searchedEpisodeIdsSelector = createEntityIdsByRelationSelector(seasonHasEpisodesRelationsSelector, currentSeasonIdSelector);
export const searchedSeasonIdsSelector = createEntityIdsByRelationSelector(seriesEntryHasSeasonsRelationsSelector, currentMediumIdSelector);
export const searchedMediumIdsSelector = createEntityIdsByRelationSelector(searchStringHasMediaRelationsSelector, currentMediaSearchStringSelector);
export const searchedBroadcastChannelIdsSelector = createEntityIdsByRelationSelector(searchStringHasBroadcastChannelsRelationsSelector, currentBroadcastChannelsSearchStringSelector);

export default createStructuredSelector({
  broadcastChannelsById: broadcastChannelsEntitiesSelector,
  medium: currentMediumSelector,
  mediaById: listMediaEntitiesSelector,
  popUpMessage: popUpMessageSelector,
  searchedBroadcastChannelIds: searchedBroadcastChannelIdsSelector,
  searchedEpisodeIds: searchedEpisodeIdsSelector,
  searchedSeasonIds: searchedSeasonIdsSelector,
  searchedMediumIds: searchedMediumIdsSelector
});
