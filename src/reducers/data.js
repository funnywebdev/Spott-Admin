import { fromJS } from 'immutable';
import {
  serializeFilterHasBroadcasters, serializeFilterHasDatalabeltypes, serializeFilterHasCharacters, serializeFilterHasCommercials, serializeFilterHasSeriesEntries,
  serializeFilterHasUsers, serializeFilterHasMediumCategories, serializeFilterHasBroadcastChannels, serializeFilterHasMovies, serializeFilterHasPersons, serializeFilterHasTopics,
  serializeFilterHasTvGuideEntries, serializeFilterHasContentProducers, serializeFilterHasInteractiveVideos,
  fetchStart, fetchSuccess, fetchError, searchStart, searchSuccess, searchError, fetchListStart, serializeFilterHasTags,
  fetchListSuccess, fetchListError, mergeListOfEntities, serializeFilterHasBrands, serializeFilterHasShops, serializeFilterHasMedia, serializeFilterHasProducts,
  serializeFilterHasCountries, serializeFilterHasProductCategories, serializeFilterHasProductLabels, serializeFilterHasLanguages,
  serializeFilterHasPushNotifications, serializeFilterHasCrops, serializeFilterHasSpotts, serializeBroadcasterFilterHasMedia,
  transformMediumToListMedium, serializeFilterHasTopMedia, serializeFilterHasDemographics, serializeFilterHasTopPeople, serializeFilterHasTopProducts, serializeFilterHasTopCommercials
} from './utils';

import * as audienceActions from '../actions/audience';
import * as availabilityActions from '../actions/availability';
import * as brandActions from '../actions/brand';
import * as brandDashboardActions from '../actions/brandDashboard';
import * as broadcastChannelActions from '../actions/broadcastChannel';
import * as broadcastersActions from '../actions/broadcaster';
import * as datalabeltypesActions from '../actions/datalabeltype';
import * as datalabelsActions from '../actions/datalabel';
import * as charactersActions from '../actions/character';
import * as collectionsActions from '../actions/collection';
import * as collectionItemsActions from '../actions/collectionItem';
import * as commercialActions from '../actions/commercial';
import * as contentProducersActions from '../actions/contentProducer';
import * as countryActions from '../actions/country';
import * as cropActions from '../actions/crop';
import * as episodeActions from '../actions/episode';
import * as languageActions from '../actions/language';
import * as mediaActions from '../actions/media';
import * as mediumCategoryActions from '../actions/mediumCategory';
import * as moviesActions from '../actions/movie';
import * as personActions from '../actions/person';
import * as productCategoryActions from '../actions/productCategory';
import * as productActions from '../actions/product';
import * as pushNotificationActions from '../actions/pushNotification';
import * as pushNotificationDestinationActions from '../actions/pushNotificationDestination';
import * as reportingActions from '../actions/reporting';
import * as scheduleEntryActions from '../actions/scheduleEntry';
import * as shopActions from '../actions/shop';
import * as seasonActions from '../actions/season';
import * as seriesActions from '../actions/series';
import * as spottActions from '../actions/spott';
import * as tagActions from '../actions/tag';
import * as topicActions from '../actions/topic';
import * as tvGuideActions from '../actions/tvGuide';
import * as userActions from '../actions/user';
import * as videoActions from '../actions/video';

export default (state = fromJS({
  entities: {
    ages: {},
    audiences: {},
    availabilities: {},
    brandDashboardEvents: {},
    brands: {},
    broadcastChannels: {},
    broadcasters: {},
    datalabeltypes: {},
    datalabels: {},
    characters: {},
    collections: {},
    contentProducers: {},
    countries: {},
    crops: {},
    demographics: {},
    events: {},
    faceImages: {}, // Characters and persons has faceImages
    genders: {},
    interactiveVideos: {},
    languages: {},
    listBrands: {},
    listCharacters: {}, // listCharacters is the light version of characters, without locales
    listCollectionItems: {},
    listCollections: {},
    listCrops: {},
    listMedia: {}, // listMedia is the light version of media, without locales
    listMediumCategories: {},
    listProducts: {},
    listProductCategories: {},
    listProductLabels: {},
    listPushNotifications: {},
    listPushNotificationDestinations: {},
    listShops: {},
    listTags: {},
    listTopics: {},
    listPersons: {}, // listCharacters is the light version of characters, without locales
    media: {}, // Completed version of media, with locales
    mediumCategories: {},
    persons: {},
    products: {},
    productOfferings: {},
    pushNotifications: {},
    tvGuideEntries: {},
    similarProducts: {},
    scheduleEntries: {},
    shops: {},
    spotts: {},
    topics: {},
    topMedia: {}, // Used in brand dashboard. Includes media, subscriptions, etc.
    topPeople: {},
    topProducts: {},
    topCommercials: {},
    users: {},
    videos: {}
  },
  relations: {
    ages: {},
    broadcastChannels: {},
    events: {},
    genders: {},

    filterHasBrands: {},
    filterHasBroadcastChannels: {},
    filterHasBroadcasters: {},
    filterHasDatalabeltypes: {},
    filterHasDatalabels: {},
    filterHasCharacters: {},
    filterHasCommercials: {},
    filterHasContentProducers: {},
    filterHasCountries: {},
    filterHasDemographics: {},
    filterHasEpisodes: {},
    filterHasInteractiveVideos: {},
    filterHasLanguages: {},
    filterHasMedia: {},
    filterHasMediumCategories: {},
    filterHasMovies: {},
    filterHasPersons: {},
    filterHasProductCategories: {},
    filterHasProductLabels: {},
    filterHasProducts: {},
    filterHasPushNotifications: {},
    filterHasSeasons: {},
    filterHasSeriesEntries: {},
    filterHasShops: {},
    filterHasSpotts: {},
    filterHasTags: {},
    filterHasTopics: {},
    filterHasTopMedia: {},
    filterHasTopPeople: {},
    filterHasTopProducts: {},
    filterHasTopCommercials: {},
    filterHasTvGuideEntries: {},
    filterHasUsers: {},

    searchStringHasActors: {},
    searchStringHasBrands: {},
    searchStringHasBroadcastChannels: {},
    searchStringHasBroadcasters: {},
    searchStringHasDatalabeltypes: {},
    searchStringHasDatalabels: {},
    searchStringHasCharacters: {},
    searchStringHasContentProducers: {},
    searchStringHasMedia: {},
    searchStringHasMediumCategories: {},
    searchStringHasPersons: {},
    searchStringHasProducts: {},
    searchStringHasProductCategories: {},
    searchStringHasProductLabels: {},
    searchStringHasPushNotificationDestinations: {},
    searchStringHasShops: {},
    searchStringHasSeriesEntries: {},
    searchStringHasTags: {},
    searchStringHasTopics: {},
    searchStringHasUsers: {},

    characterHasFaceImages: {},
    collectionHasCollectionItems: {},
    commercialHasScheduleEntries: {},
    imageHasSuggestedProducts: {},
    mediumHasAudiences: {},
    mediumHasAvailabilities: {},
    mediumHasBrands: {},
    mediumHasCrops: {},
    mediumHasCollections: {},
    mediumHasShops: {},
    mediumHasTvGuideEntries: {},
    mediumHasUnassignedProducts: {},
    personHasFaceImages: {},
    productHasProductOfferings: {},
    productHasSimilarProducts: {},
    seasonHasEpisodes: {},
    seriesEntryHasEpisodes: {},
    seriesEntryHasSeasons: {},
    topicHasSpotts: {},
    videoHasCrops: {}
  }
}), action) => {
  switch (action.type) {

    // Availabilities
    // //////////////

    case availabilityActions.AVAILABILITIES_FETCH_START:
      return searchStart(state, 'mediumHasAvailabilities', action.mediumId);
    case availabilityActions.AVAILABILITIES_FETCH_SUCCESS:
      return searchSuccess(state, 'availabilities', 'mediumHasAvailabilities', action.mediumId, action.data);
    case availabilityActions.AVAILABILITIES_FETCH_ERROR:
      return searchError(state, 'mediumHasAvailabilities', action.mediumId, action.error);

    case availabilityActions.AVAILABILITY_FETCH_START:
      return fetchStart(state, [ 'entities', 'availabilities', action.availabilityId ]);
    case availabilityActions.AVAILABILITY_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'availabilities', action.availabilityId ], action.data);
    case availabilityActions.AVAILABILITY_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'availabilities', action.availabilityId ], action.error);

    // Audiences
    // /////////

    case audienceActions.AUDIENCES_FETCH_START:
      return searchStart(state, 'mediumHasAudiences', action.mediumId);
    case audienceActions.AUDIENCES_FETCH_SUCCESS:
      return searchSuccess(state, 'audiences', 'mediumHasAudiences', action.mediumId, action.data.data);
    case audienceActions.AUDIENCES_FETCH_ERROR:
      return searchError(state, 'mediumHasAudiences', action.mediumId, action.error);

    case audienceActions.AUDIENCE_FETCH_START:
      return fetchStart(state, [ 'entities', 'audiences', action.audienceId ]);
    case audienceActions.AUDIENCE_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'audiences', action.audienceId ], action.data);
    case audienceActions.AUDIENCE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'audiences', action.audienceId ], action.error);

    // Countries
    // /////////

    case countryActions.COUNTRIES_FETCH_START:
      return searchStart(state, 'filterHasCountries', serializeFilterHasCountries(action));
    case countryActions.COUNTRIES_FETCH_SUCCESS:
      return searchSuccess(state, 'countries', 'filterHasCountries', serializeFilterHasCountries(action), action.data.data);
    case countryActions.COUNTRIES_FETCH_ERROR:
      return searchError(state, 'filterHasCountries', serializeFilterHasCountries(action), action.error);

    // Brand dashboard
    // ///////////////

    case brandDashboardActions.TOP_MEDIA_FETCH_START:
      return searchStart(state, 'filterHasTopMedia', serializeFilterHasTopMedia(action));
    case brandDashboardActions.TOP_MEDIA_FETCH_SUCCESS:
      return searchSuccess(state, 'topMedia', 'filterHasTopMedia', serializeFilterHasTopMedia(action), action.data.data);
    case brandDashboardActions.TOP_MEDIA_FETCH_ERROR:
      return searchError(state, 'filterHasTopMedia', serializeFilterHasTopMedia(action), action.error);

    case brandDashboardActions.TOP_COMMERCIALS_FETCH_START:
      return searchStart(state, 'filterHasTopCommercials', serializeFilterHasTopCommercials(action));
    case brandDashboardActions.TOP_COMMERCIALS_FETCH_SUCCESS:
      return searchSuccess(state, 'topCommercials', 'filterHasTopCommercials', serializeFilterHasTopCommercials(action), action.data.data);
    case brandDashboardActions.TOP_COMMERCIALS_FETCH_ERROR:
      return searchError(state, 'filterHasTopCommercials', serializeFilterHasTopCommercials(action), action.error);

    case brandDashboardActions.TOP_PEOPLE_FETCH_START:
      return searchStart(state, 'filterHasTopPeople', serializeFilterHasTopPeople(action));
    case brandDashboardActions.TOP_PEOPLE_FETCH_SUCCESS:
      return searchSuccess(state, 'topPeople', 'filterHasTopPeople', serializeFilterHasTopPeople(action), action.data.data);
    case brandDashboardActions.TOP_PEOPLE_FETCH_ERROR:
      return searchError(state, 'filterHasTopPeople', serializeFilterHasTopPeople(action), action.error);

    case brandDashboardActions.TOP_PRODUCTS_FETCH_START:
      return searchStart(state, 'filterHasTopProducts', serializeFilterHasTopProducts(action));
    case brandDashboardActions.TOP_PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'topProducts', 'filterHasTopProducts', serializeFilterHasTopProducts(action), action.data.data);
    case brandDashboardActions.TOP_PRODUCTS_FETCH_ERROR:
      return searchError(state, 'filterHasTopProducts', serializeFilterHasTopProducts(action), action.error);

    case brandDashboardActions.DEMOGRAPHICS_FETCH_START:
      return searchStart(state, 'filterHasDemographics', serializeFilterHasDemographics(action));
    case brandDashboardActions.DEMOGRAPHICS_FETCH_SUCCESS:
      return searchSuccess(state, 'demographics', 'filterHasDemographics', serializeFilterHasDemographics(action), action.data.data);
    case brandDashboardActions.DEMOGRAPHICS_FETCH_ERROR:
      return searchError(state, 'filterHasDemographics', serializeFilterHasDemographics(action), action.error);

    // case brandDashboardActions.AGE_DATA_FETCH_START:
    //   return searchStart(state, 'filterHasDemographics', serializeFilterHasDemographics(action));
    // case brandDashboardActions.AGE_DATA_FETCH_SUCCESS:
    //   return searchSuccess(state, 'demographics', 'filterHasDemographics', serializeFilterHasDemographics(action), action.data.data);
    // case brandDashboardActions.AGE_DATA_FETCH_ERROR:
    //   return searchError(state, 'filterHasDemographics', serializeFilterHasDemographics(action), action.error);

    // Brands
    // /////////////////

    case brandActions.UPLOAD_LOGO_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'brands', action.brandId ], action.data);
    case brandActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'brands', action.brandId ], action.data);

    case brandActions.BRAND_FETCH_START:
      return fetchStart(state, [ 'entities', 'brands', action.brandId ]);
    case brandActions.BRAND_FETCH_SUCCESS: {
      // We will convert the full version of brands to a light version. This is needed when we
      // want to create a product from the read page of a brand. Otherwise the brand field
      // will be empty.
      const newState = fetchSuccess(state, [ 'entities', 'listBrands', action.brandId ], {
        id: action.data.id,
        name: action.data.name[action.data.defaultLocale],
        logo: action.data.logo [action.data.defaultLocale] }) || state;
      return fetchSuccess(newState, [ 'entities', 'brands', action.brandId ], action.data);
    }
    case brandActions.BRAND_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'brands', action.brandId ], action.error);

    case brandActions.BRANDS_FETCH_START:
      return searchStart(state, 'filterHasBrands', serializeFilterHasBrands(action));
    case brandActions.BRANDS_FETCH_SUCCESS:
      return searchSuccess(state, 'listBrands', 'filterHasBrands', serializeFilterHasBrands(action), action.data.data);
    case brandActions.BRANDS_FETCH_ERROR:
      return searchError(state, 'filterHasBrands', serializeFilterHasBrands(action), action.error);

    case brandActions.PRODUCTS_FETCH_START:
      return searchStart(state, 'filterHasProducts', serializeFilterHasProducts(action, 'brands'));
    case brandActions.PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'listProducts', 'filterHasProducts', serializeFilterHasProducts(action, 'brands'), action.data.data);
    case brandActions.PRODUCTS_FETCH_ERROR:
      return searchError(state, 'filterHasProducts', serializeFilterHasProducts(action, 'brands'), action.error);

    case brandActions.BRAND_USERS_FETCH_START:
      return searchStart(state, 'filterHasUsers', serializeFilterHasUsers(action, 'brands'));
    case brandActions.BRAND_USERS_FETCH_SUCCESS:
      return searchSuccess(state, 'users', 'filterHasUsers', serializeFilterHasUsers(action, 'brands'), action.data.data);
    case brandActions.BRAND_USERS_FETCH_ERROR:
      return searchError(state, 'filterHasUsers', serializeFilterHasUsers(action, 'brands'), action.error);

    case brandActions.BRAND_SEARCH_START:
      return searchStart(state, 'searchStringHasBrands', action.searchString);
    case brandActions.BRAND_SEARCH_SUCCESS:
      return searchSuccess(state, 'listBrands', 'searchStringHasBrands', action.searchString, action.data);
    case brandActions.BRAND_SEARCH_ERROR:
      return searchError(state, 'searchStringHasBrands', action.searchString, action.error);

    case brandActions.MEDIUM_BRAND_SEARCH_START:
      return searchStart(state, 'mediumHasBrands', action.mediumId);
    case brandActions.MEDIUM_BRAND_SEARCH_SUCCESS:
      return searchSuccess(state, 'listBrands', 'mediumHasBrands', action.mediumId, action.data);
    case brandActions.MEDIUM_BRAND_SEARCH_ERROR:
      return searchError(state, 'mediumHasBrands', action.mediumId, action.error);

    case brandActions.TOPIC_FETCH_START:
      return fetchStart(state, [ 'entities', 'brands', action.brandId ]);
    case brandActions.TOPIC_FETCH_SUCCESS: {
      const newState = fetchSuccess(state, [ 'entities', 'topics', action.data.id ], action.data) || state;
      return fetchSuccess(newState, [ 'entities', 'brands', action.brandId ], action.data);
    }
    case brandActions.TOPIC_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'brands', action.brandId ], action.error);

    // Broadcaster Channels
    // ////////////////////

    case broadcastChannelActions.BROADCAST_CHANNEL_UPLOAD_IMAGE_SUCCESS:
      return searchSuccess(state, 'broadcastChannels', 'searchStringHasBroadcastChannels', action.searchString, action.data);

    case broadcastChannelActions.BROADCAST_CHANNEL_FETCH_START:
      return fetchStart(state, [ 'entities', 'broadcastChannels', action.broadcastChannelId ]);
    case broadcastChannelActions.BROADCAST_CHANNEL_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'broadcastChannels', action.broadcastChannelId ], action.data);
    case broadcastChannelActions.BROADCAST_CHANNEL_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'broadcastChannels', action.broadcastChannelId ], action.error);

    case broadcastChannelActions.BROADCAST_CHANNELS_FETCH_START:
      return searchStart(state, 'filterHasBroadcastChannels', serializeFilterHasBroadcastChannels(action));
    case broadcastChannelActions.BROADCAST_CHANNELS_FETCH_SUCCESS:
      return searchSuccess(state, 'broadcastChannels', 'filterHasBroadcastChannels', serializeFilterHasBroadcastChannels(action), action.data.data);
    case broadcastChannelActions.BROADCAST_CHANNELS_FETCH_ERROR:
      return searchError(state, 'filterHasBroadcastChannels', serializeFilterHasBroadcastChannels(action), action.error);

    case broadcastersActions.BROADCASTER_CHANNELS_SEARCH_START:
      return searchStart(state, 'filterHasBroadcastChannels', serializeFilterHasBroadcastChannels(action));
    case broadcastersActions.BROADCASTER_CHANNELS_SEARCH_SUCCESS:
      return searchSuccess(state, 'broadcastChannels', 'filterHasBroadcastChannels', serializeFilterHasBroadcastChannels(action), action.data.data);
    case broadcastersActions.BROADCASTER_CHANNELS_SEARCH_ERROR:
      return searchError(state, 'filterHasBroadcastChannels', serializeFilterHasBroadcastChannels(action), action.error);

    case broadcastChannelActions.BROADCAST_CHANNEL_SEARCH_START:
      return searchStart(state, 'searchStringHasBroadcastChannels', action.searchString);
    case broadcastChannelActions.BROADCAST_CHANNEL_SEARCH_SUCCESS:
      return searchSuccess(state, 'broadcastChannels', 'searchStringHasBroadcastChannels', action.searchString, action.data);
    case broadcastChannelActions.BROADCAST_CHANNEL_SEARCH_ERROR:
      return searchError(state, 'searchStringHasBroadcastChannels', action.searchString, action.error);

    // Broadcasters
    // ////////////

    case broadcastersActions.BROADCASTER_UPLOAD_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'broadcasters', action.broadcasterId ], action.data);

    case broadcastersActions.BROADCASTER_USERS_FETCH_START:
      return searchStart(state, 'filterHasUsers', serializeFilterHasUsers(action, 'broadcasters'));
    case broadcastersActions.BROADCASTER_USERS_FETCH_SUCCESS:
      return searchSuccess(state, 'users', 'filterHasUsers', serializeFilterHasUsers(action, 'broadcasters'), action.data.data);
    case broadcastersActions.BROADCASTER_USERS_FETCH_ERROR:
      return searchError(state, 'filterHasUsers', serializeFilterHasUsers(action, 'broadcasters'), action.error);

    case broadcastersActions.BROADCASTER_CHANNELS_FETCH_START:
      return fetchListStart(state, 'broadcastChannels');
    case broadcastersActions.BROADCASTER_CHANNELS_FETCH_SUCCESS:
      return fetchListSuccess(state, 'broadcastChannels', 'broadcastChannels', action.data.data);
    case broadcastersActions.BROADCASTER_CHANNELS_FETCH_ERROR:
      return fetchListError(state, 'broadcastChannels', action.error);

    case broadcastersActions.BROADCASTER_FETCH_START:
      return fetchStart(state, [ 'entities', 'broadcasters', action.broadcasterId ]);
    case broadcastersActions.BROADCASTER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'broadcasters', action.broadcasterId ], action.data);
    case broadcastersActions.BROADCASTER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'broadcasters', action.broadcasterId ], action.error);

    case broadcastersActions.BROADCASTERS_FETCH_START:
      return searchStart(state, 'filterHasBroadcasters', serializeFilterHasBroadcasters(action));
    case broadcastersActions.BROADCASTERS_FETCH_SUCCESS:
      return searchSuccess(state, 'broadcasters', 'filterHasBroadcasters', serializeFilterHasBroadcasters(action), action.data.data);
    case broadcastersActions.BROADCASTERS_FETCH_ERROR:
      return searchError(state, 'filterHasBroadcasters', serializeFilterHasBroadcasters(action), action.error);

    case broadcastersActions.BROADCASTER_SEARCH_START:
      return searchStart(state, 'searchStringHasBroadcasters', action.searchString);
    case broadcastersActions.BROADCASTER_SEARCH_SUCCESS:
      return searchSuccess(state, 'broadcasters', 'searchStringHasBroadcasters', action.searchString, action.data);
    case broadcastersActions.BROADCASTER_SEARCH_ERROR:
      return searchError(state, 'searchStringHasBroadcasters', action.searchString, action.error);

    case broadcastersActions.BROADCASTER_MEDIA_SEARCH_START:
      return searchStart(state, 'filterHasMedia', serializeBroadcasterFilterHasMedia(action));
    case broadcastersActions.BROADCASTER_MEDIA_SEARCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'filterHasMedia', serializeBroadcasterFilterHasMedia(action), action.data.data);
    case broadcastersActions.BROADCASTER_MEDIA_SEARCH_ERROR:
      return searchError(state, 'filterHasMedia', serializeBroadcasterFilterHasMedia(action), action.error);

    case datalabeltypesActions.DATALABELTYPE_FETCH_START:
      return fetchStart(state, [ 'entities', 'datalabeltypes', action.datalabeltypeId ]);
    case datalabeltypesActions.DATALABELTYPE_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'datalabeltypes', action.datalabeltypeId ], action.data);
    case datalabeltypesActions.DATALABELTYPE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'datalabeltypes', action.datalabeltypeId ], action.error);

    case datalabeltypesActions.DATALABELTYPES_FETCH_START:
      return searchStart(state, 'filterHasDatalabeltypes', serializeFilterHasDatalabeltypes(action));
    case datalabeltypesActions.DATALABELTYPES_FETCH_SUCCESS:
      return searchSuccess(state, 'datalabeltypes', 'filterHasDatalabeltypes', serializeFilterHasDatalabeltypes(action), action.data.data);
    case datalabeltypesActions.DATALABELTYPES_FETCH_ERROR:
      return searchError(state, 'filterHasDatalabeltypes', serializeFilterHasDatalabeltypes(action), action.error);

    case datalabelsActions.DATALABEL_FETCH_START:
      return fetchStart(state, [ 'entities', 'listProductLabels', action.datalabelId ]);
    case datalabelsActions.DATALABEL_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'listProductLabels', action.datalabelId ], action.data);
    case datalabelsActions.DATALABEL_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'listProductLabels', action.datalabelId ], action.error);

    case datalabelsActions.DATALABELS_FETCH_START:
      return searchStart(state, 'listProductLabels', serializeFilterHasProductLabels(action));
    case datalabelsActions.DATALABELS_FETCH_SUCCESS:
      return searchSuccess(state, 'listProductLabels', 'filterHasProductLabels', serializeFilterHasProductLabels(action), action.data.data);
    case datalabelsActions.DATALABELS_FETCH_ERROR:
      return searchError(state, 'filterHasProductLabels', serializeFilterHasProductLabels(action), action.error);

    case datalabelsActions.DATALABELS_SEARCH_START:
      return searchStart(state, 'searchStringHasProductLabels', action.searchString);
    case datalabelsActions.DATALABELS_SEARCH_SUCCESS:
      return searchSuccess(state, 'listProductLabels', 'searchStringHasProductLabels', action.searchString, action.data);
    case datalabelsActions.DATALABELS_SEARCH_ERROR:
      return searchError(state, 'searchStringHasProductLabels', action.searchString, action.error);

    // Characters
    // //////////

    case charactersActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'characters', action.characterId ], action.data);
    case charactersActions.UPLOAD_PORTRAIT_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'characters', action.characterId ], action.data);

    case charactersActions.CHARACTER_FETCH_START:
      return fetchStart(state, [ 'entities', 'characters', action.characterId ]);
    case charactersActions.CHARACTER_FETCH_SUCCESS: {
      const newState = action.data.person && fetchSuccess(state, [ 'entities', 'listPersons', action.data.person.id ], action.data.person) || state;
      return fetchSuccess(newState, [ 'entities', 'characters', action.characterId ], action.data);
    }
    case charactersActions.CHARACTER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'characters', action.characterId ], action.error);

    case charactersActions.CHARACTERS_FETCH_START:
      return searchStart(state, 'filterHasCharacters', serializeFilterHasCharacters(action));
    case charactersActions.CHARACTERS_FETCH_SUCCESS:
      return searchSuccess(state, 'listCharacters', 'filterHasCharacters', serializeFilterHasCharacters(action), action.data.data);
    case charactersActions.CHARACTERS_FETCH_ERROR:
      return searchError(state, 'filterHasCharacters', serializeFilterHasCharacters(action), action.error);

    case charactersActions.CHARACTER_SEARCH_START:
      return searchStart(state, 'searchStringHasCharacters', action.searchString);
    case charactersActions.CHARACTER_SEARCH_SUCCESS:
      return searchSuccess(state, 'listCharacters', 'searchStringHasCharacters', action.searchString, action.data);
    case charactersActions.CHARACTER_SEARCH_ERROR:
      return searchError(state, 'searchStringHasCharacters', action.searchString, action.error);

    case charactersActions.CHARACTER_FACE_IMAGES_FETCH_START:
      return searchStart(state, 'characterHasFaceImages', action.characterId);
    case charactersActions.CHARACTER_FACE_IMAGES_FETCH_SUCCESS:
      return searchSuccess(state, 'faceImages', 'characterHasFaceImages', action.characterId, action.data.data);
    case charactersActions.CHARACTER_FACE_IMAGES_FETCH_ERROR:
      return searchError(state, 'characterHasFaceImages', action.characterId, action.error);

    case charactersActions.MEDIUM_CHARACTER_SEARCH_START:
      return searchStart(state, 'filterHasCharacters', serializeFilterHasCharacters(action, action.mediumId));
    case charactersActions.MEDIUM_CHARACTER_SEARCH_SUCCESS:
      return searchSuccess(state, 'listCharacters', 'filterHasCharacters', serializeFilterHasCharacters(action, action.mediumId), action.data);
    case charactersActions.MEDIUM_CHARACTER_SEARCH_ERROR:
      return searchError(state, 'filterHasCharacters', serializeFilterHasCharacters(action, action.mediumId), action.error);

    case charactersActions.TOPIC_FETCH_START:
      return fetchStart(state, [ 'entities', 'characters', action.characterId ]);
    case charactersActions.TOPIC_FETCH_SUCCESS: {
      const newState = fetchSuccess(state, [ 'entities', 'topics', action.data.id ], action.data) || state;
      return fetchSuccess(newState, [ 'entities', 'characters', action.characterId ], action.data);
    }
    case charactersActions.TOPIC_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'characters', action.characterId ], action.error);

    // Collections
    // ///////////

    case collectionsActions.COLLECTION_FETCH_START:
      return fetchStart(state, [ 'entities', 'collections', action.collectionId ]);
    case collectionsActions.COLLECTION_FETCH_SUCCESS: {
      const { brand, character } = action.data;
      let newState = brand && fetchSuccess(state, [ 'entities', 'listBrands', brand.id ], brand) || state;
      newState = character && fetchSuccess(newState, [ 'entities', 'listCharacters', character.id ], character) || newState;
      return fetchSuccess(newState, [ 'entities', 'collections', action.collectionId ], action.data);
    }
    case collectionsActions.COLLECTION_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'collections', action.collectionId ], action.error);

    case collectionsActions.MEDIUM_COLLECTIONS_FETCH_START:
      return searchStart(state, 'mediumHasCollections', action.mediumId);
    case collectionsActions.MEDIUM_COLLECTIONS_FETCH_SUCCESS:
      return searchSuccess(state, 'listCollections', 'mediumHasCollections', action.mediumId, action.data.data);
    case collectionsActions.MEDIUM_COLLECTIONS_FETCH_ERROR:
      return searchError(state, 'mediumHasCollections', action.mediumId, action.error);

    // Collection items
    // ////////////////

    case collectionItemsActions.COLLECTION_ITEM_FETCH_START:
      return fetchStart(state, [ 'entities', 'collectionItems', action.collectionItemId ]);
    case collectionItemsActions.COLLECTION_ITEM_FETCH_SUCCESS: {
      const newState = action.data.product && fetchSuccess(state, [ 'entities', 'listProducts', action.data.product.id ], action.data.product) || state;
      return fetchSuccess(newState, [ 'entities', 'collectionItems', action.collectionItemId ], action.data);
    }
    case collectionItemsActions.COLLECTION_ITEM_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'collectionItems', action.collectionItemId ], action.error);

    case collectionItemsActions.COLLECTION_ITEMS_FETCH_START:
      return searchStart(state, 'collectionHasCollectionItems', action.collectionId);
    case collectionItemsActions.COLLECTION_ITEMS_FETCH_SUCCESS:
      return searchSuccess(state, 'listCollectionItems', 'collectionHasCollectionItems', action.collectionId, action.data.data);
    case collectionItemsActions.COLLECTION_ITEMS_FETCH_ERROR:
      return searchError(state, 'collectionHasCollectionItems', action.collectionId, action.error);

    // Commercials
    // ///////////

    case commercialActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.commercialId ], action.data);
    case commercialActions.UPLOAD_ROUND_LOGO_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.commercialId ], action.data);

    case commercialActions.COMMERCIAL_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.commercialId ]);
    case commercialActions.COMMERCIAL_FETCH_SUCCESS: {
      const { brand, bannerActor, bannerBrand, bannerCharacter, bannerMedium, contentProducers } = action.data;
      let newState = brand && fetchSuccess(state, [ 'entities', 'listBrands', brand.id ], brand) || state;
      newState = contentProducers && mergeListOfEntities(newState, [ 'entities', 'contentProducers' ], contentProducers) || newState;
      newState = bannerActor && fetchSuccess(state, [ 'entities', 'listPersons', bannerActor.id ], bannerActor) || newState;
      newState = bannerBrand && fetchSuccess(newState, [ 'entities', 'listBrands', bannerBrand.id ], bannerBrand) || newState;
      newState = bannerCharacter && fetchSuccess(newState, [ 'entities', 'listCharacters', bannerCharacter.id ], bannerCharacter) || newState;
      newState = bannerMedium && fetchSuccess(newState, [ 'entities', 'listMedia', bannerMedium.id ], bannerMedium) || newState;
      return fetchSuccess(newState, [ 'entities', 'media', action.commercialId ], action.data);
    }
    case commercialActions.COMMERCIAL_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.commercialId ], action.error);

    case commercialActions.COMMERCIALS_FETCH_START:
      return searchStart(state, 'filterHasCommercials', serializeFilterHasCommercials(action));
    case commercialActions.COMMERCIALS_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'filterHasCommercials', serializeFilterHasCommercials(action), action.data.data);
    case commercialActions.COMMERCIALS_FETCH_ERROR:
      return searchError(state, 'filterHasCommercials', serializeFilterHasCommercials(action), action.error);

    case commercialActions.COMMERCIAL_SCHEDULE_ENTRIES_FETCH_START:
      return searchStart(state, 'commercialHasScheduleEntries', action.mediumId);
    case commercialActions.COMMERCIAL_SCHEDULE_ENTRIES_FETCH_SUCCESS:
      return searchSuccess(state, 'scheduleEntries', 'commercialHasScheduleEntries', action.commercialId, action.data);
    case commercialActions.COMMERCIAL_SCHEDULE_ENTRIES_FETCH_ERROR:
      return searchError(state, 'commercialHasScheduleEntries', action.mediumId, action.error);

    case scheduleEntryActions.SCHEDULE_ENTRY_FETCH_SUCCESS: {
      const { broadcaster, broadcastChannels, media } = action.data;
      let newState = broadcaster && fetchSuccess(state, [ 'entities', 'broadcaster', broadcaster.id ], broadcaster) || state;
      newState = broadcastChannels && mergeListOfEntities(newState, [ 'entities', 'broadcastChannels' ], broadcastChannels) || newState;
      newState = media && mergeListOfEntities(newState, [ 'entities', 'listMedia' ], media) || newState;
      return fetchSuccess(newState, [ 'entities', 'scheduleEntries', action.scheduleEntryId ], action.data);
    }

    // Content producers
    // /////////////////

    case contentProducersActions.CONTENT_PRODUCER_UPLOAD_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'contentProducers', action.contentProducerId ], action.data);

    case contentProducersActions.CONTENT_PRODUCER_USERS_FETCH_START:
      return searchStart(state, 'filterHasUsers', serializeFilterHasUsers(action, 'contentProducers'));
    case contentProducersActions.CONTENT_PRODUCER_USERS_FETCH_SUCCESS:
      return searchSuccess(state, 'users', 'filterHasUsers', serializeFilterHasUsers(action, 'contentProducers'), action.data.data);
    case contentProducersActions.CONTENT_PRODUCER_USERS_FETCH_ERROR:
      return searchError(state, 'filterHasUsers', serializeFilterHasUsers(action, 'contentProducers'), action.error);

    case contentProducersActions.CONTENT_PRODUCER_FETCH_START:
      return fetchStart(state, [ 'entities', 'contentProducers', action.contentProducerId ]);
    case contentProducersActions.CONTENT_PRODUCER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'contentProducers', action.contentProducerId ], action.data);
    case contentProducersActions.CONTENT_PRODUCER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'contentProducers', action.contentProducerId ], action.error);

    case contentProducersActions.CONTENT_PRODUCERS_FETCH_START:
      return searchStart(state, 'filterHasContentProducers', serializeFilterHasContentProducers(action));
    case contentProducersActions.CONTENT_PRODUCERS_FETCH_SUCCESS:
      return searchSuccess(state, 'contentProducers', 'filterHasContentProducers', serializeFilterHasContentProducers(action), action.data.data);
    case contentProducersActions.CONTENT_PRODUCERS_FETCH_ERROR:
      return searchError(state, 'filterHasContentProducers', serializeFilterHasContentProducers(action), action.error);

    case contentProducersActions.CONTENT_PRODUCER_SEARCH_START:
      return searchStart(state, 'searchStringHasContentProducers', action.searchString);
    case contentProducersActions.CONTENT_PRODUCER_SEARCH_SUCCESS:
      return searchSuccess(state, 'contentProducers', 'searchStringHasContentProducers', action.searchString, action.data);
    case contentProducersActions.CONTENT_PRODUCER_SEARCH_ERROR:
      return searchError(state, 'searchStringHasContentProducers', action.searchString, action.error);

    // Crops
    // /////

    case cropActions.CROP_FETCH_START:
      return fetchStart(state, [ 'entities', 'crops', action.cropId ]);
    case cropActions.CROP_FETCH_SUCCESS: {
      const newState = action.data.topics && mergeListOfEntities(state, [ 'entities', 'topics' ], action.data.topics) || state;
      return fetchSuccess(newState, [ 'entities', 'crops', action.cropId ], action.data);
    }
    case cropActions.CROP_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'crops', action.cropId ], action.error);

    case cropActions.CROPS_FETCH_START:
      return searchStart(state, 'videoHasCrops', action.videoId);
    case cropActions.CROPS_FETCH_SUCCESS:
      return searchSuccess(state, 'listCrops', 'videoHasCrops', action.videoId, action.data);
    case cropActions.CROPS_FETCH_ERROR:
      return searchError(state, 'videoHasCrops', action.videoId, action.error);

    // Episodes
    // ////////

    case episodeActions.UPLOAD_POSTER_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.episodeId ], action.data);
    case episodeActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.episodeId ], action.data);

    case episodeActions.EPISODE_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.episodeId ]);
    case episodeActions.EPISODE_FETCH_SUCCESS: {
      let newState = state;
      newState = action.data.seriesEntry && fetchSuccess(state, [ 'entities', 'listMedia', action.data.seriesEntry.id ], action.data.seriesEntry) || newState;
      newState = action.data.broadcasters && mergeListOfEntities(newState, [ 'entities', 'broadcasters' ], action.data.broadcasters) || newState;
      newState = action.data.contentProducers && mergeListOfEntities(newState, [ 'entities', 'contentProducers' ], action.data.contentProducers) || newState;
      return fetchSuccess(newState, [ 'entities', 'media', action.episodeId ], action.data);
    }
    case episodeActions.EPISODE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.episodeId ], action.error);

    // Languages
    // /////////

    case languageActions.LANGUAGES_FETCH_START:
      return searchStart(state, 'filterHasLanguages', serializeFilterHasLanguages(action));
    case languageActions.LANGUAGES_FETCH_SUCCESS:
      return searchSuccess(state, 'languages', 'filterHasLanguages', serializeFilterHasLanguages(action), action.data.data);
    case languageActions.LANGUAGES_FETCH_ERROR:
      return searchError(state, 'filterHasLanguages', serializeFilterHasLanguages(action), action.error);

    // Topics
    // //////
    case topicActions.UPLOAD_BACKGROUND_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'topics', action.topicId ], action.data);
    case topicActions.UPLOAD_THUMB_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'topics', action.topicId ], action.data);

    case topicActions.SPOTTS_FETCH_START:
      return searchStart(state, 'topicHasSpotts', serializeFilterHasSpotts(action));
    case topicActions.SPOTTS_FETCH_SUCCESS:
      return searchSuccess(state, 'spotts', 'topicHasSpotts', serializeFilterHasSpotts(action), action.data.data);
    case topicActions.SPOTTS_FETCH_ERROR:
      return searchError(state, 'topicHasSpotts', serializeFilterHasSpotts(action), action.error);

    case topicActions.TOPIC_FETCH_START:
      return fetchStart(state, [ 'entities', 'topics', action.topicId ]);
    case topicActions.TOPIC_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'topics', action.topicId ], action.data);
    case topicActions.TOPIC_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'topics', action.topicId ], action.error);

    case topicActions.TOPICS_FETCH_START:
      return searchStart(state, 'filterHasTopics', serializeFilterHasTopics(action));
    case topicActions.TOPICS_FETCH_SUCCESS:
      return searchSuccess(state, 'listTopics', 'filterHasTopics', serializeFilterHasTopics(action), action.data.data);
    case topicActions.TOPICS_FETCH_ERROR:
      return searchError(state, 'filterHasTopics', serializeFilterHasTopics(action), action.error);

    case topicActions.TOPICS_SEARCH_START:
      return searchStart(state, 'searchStringHasTopics', action.searchString);
    case topicActions.TOPICS_SEARCH_SUCCESS:
      return searchSuccess(state, 'topics', 'searchStringHasTopics', action.searchString, action.data.data);
    case topicActions.TOPICS_SEARCH_ERROR:
      return searchError(state, 'searchStringHasTopics', action.searchString, action.error);

    case topicActions.TOPIC_PERSIST_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'topics', action.data.id ], action.data);

    case topicActions.CROP_TOPICS_FETCH_SUCCESS:
      return mergeListOfEntities(state, [ 'entities', 'topics' ], action.data.data);

    // Media
    // /////

    case mediaActions.MEDIA_SEARCH_START:
      return searchStart(state, 'searchStringHasMedia', action.searchString);
    case mediaActions.MEDIA_SEARCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'searchStringHasMedia', action.searchString, action.data);
    case mediaActions.MEDIA_SEARCH_ERROR:
      return searchError(state, 'searchStringHasMedia', action.searchString, action.error);

    case mediaActions.DELETE_POSTER_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.mediumId ], action.data);
    case mediaActions.DELETE_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.mediumId ], action.data);

    case mediaActions.TV_GUIDE_ENTRIES_FETCH_START:
      return searchStart(state, 'mediumHasTvGuideEntries', serializeFilterHasTvGuideEntries(action));
    case mediaActions.TV_GUIDE_ENTRIES_FETCH_SUCCESS:
      return searchSuccess(state, 'tvGuideEntries', 'mediumHasTvGuideEntries', serializeFilterHasTvGuideEntries(action), action.data.data);
    case mediaActions.TV_GUIDE_ENTRIES_FETCH_ERROR:
      return searchError(state, 'mediumHasTvGuideEntries', serializeFilterHasTvGuideEntries(action), action.error);

    case mediaActions.CROPS_FETCH_START:
      return searchStart(state, 'mediumHasCrops', serializeFilterHasCrops(action));
    case mediaActions.CROPS_FETCH_SUCCESS:
      return searchSuccess(state, 'crops', 'mediumHasCrops', serializeFilterHasCrops(action), action.data.data);
    case mediaActions.CROPS_FETCH_ERROR:
      return searchError(state, 'mediumHasCrops', serializeFilterHasCrops(action), action.error);

    case mediaActions.MEDIUM_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.mediumId ]);
    case mediaActions.MEDIUM_FETCH_SUCCESS: {
      let newState = state;
      newState = action.data.broadcasters && mergeListOfEntities(newState, [ 'entities', 'broadcasters' ], action.data.broadcasters) || newState;
      newState = action.data.contentProducers && mergeListOfEntities(newState, [ 'entities', 'contentProducers' ], action.data.contentProducers) || newState;
      const listMedium = transformMediumToListMedium(action.data);
      newState = fetchSuccess(newState, [ 'entities', 'listMedia', action.mediumId ], listMedium);
      return fetchSuccess(newState, [ 'entities', 'media', action.mediumId ], action.data);
    }
    case mediaActions.MEDIUM_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.mediumId ], action.error);

    case mediaActions.MEDIA_FETCH_START:
      return searchStart(state, 'filterHasMedia', serializeFilterHasMedia(action));
    case mediaActions.MEDIA_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'filterHasMedia', serializeFilterHasMedia(action), action.data.data);
    case mediaActions.MEDIA_FETCH_ERROR:
      return searchError(state, 'filterHasMedia', serializeFilterHasMedia(action), action.error);

    case mediaActions.TOPIC_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.mediumId ]);
    case mediaActions.TOPIC_FETCH_SUCCESS: {
      const newState = fetchSuccess(state, [ 'entities', 'topics', action.data.id ], action.data) || state;
      return fetchSuccess(newState, [ 'entities', 'media', action.mediumId ], action.data);
    }
    case mediaActions.TOPIC_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.mediumId ], action.error);

    // Medium categories
    // /////////////////

    case mediumCategoryActions.MEDIUM_CATEGORIES_FETCH_START:
      return searchStart(state, 'filterHasMediumCategories', serializeFilterHasMediumCategories(action));
    case mediumCategoryActions.MEDIUM_CATEGORIES_FETCH_SUCCESS:
      return searchSuccess(state, 'listMediumCategories', 'filterHasMediumCategories', serializeFilterHasMediumCategories(action), action.data.data);
    case mediumCategoryActions.MEDIUM_CATEGORIES_FETCH_ERROR:
      return searchError(state, 'filterHasMediumCategories', serializeFilterHasMediumCategories(action), action.error);

    case mediumCategoryActions.MEDIUM_CATEGORIES_SEARCH_START:
      return searchStart(state, 'searchStringHasMediumCategories', action.searchString);
    case mediumCategoryActions.MEDIUM_CATEGORIES_SEARCH_SUCCESS:
      return searchSuccess(state, 'listMediumCategories', 'searchStringHasMediumCategories', action.searchString, action.data);
    case mediumCategoryActions.MEDIUM_CATEGORIES_SEARCH_ERROR:
      return searchError(state, 'searchStringHasMediumCategories', action.searchString, action.error);

    // Movies
    // //////

    case moviesActions.UPLOAD_POSTER_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.movieId ], action.data);
    case moviesActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.movieId ], action.data);
    case moviesActions.UPLOAD_ROUND_LOGO_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.movieId ], action.data);

    case moviesActions.MOVIE_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.movieId ]);
    case moviesActions.MOVIE_FETCH_SUCCESS: {
      let newState = state;
      newState = action.data.broadcasters && mergeListOfEntities(newState, [ 'entities', 'broadcasters' ], action.data.broadcasters) || newState;
      newState = action.data.contentProducers && mergeListOfEntities(newState, [ 'entities', 'contentProducers' ], action.data.contentProducers) || newState;
      return fetchSuccess(newState, [ 'entities', 'media', action.movieId ], action.data);
    }
    case moviesActions.MOVIE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.movieId ], action.error);

    case moviesActions.MOVIES_FETCH_START:
      return searchStart(state, 'filterHasMovies', serializeFilterHasMovies(action));
    case moviesActions.MOVIES_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'filterHasMovies', serializeFilterHasMovies(action), action.data.data);
    case moviesActions.MOVIES_FETCH_ERROR:
      return searchError(state, 'filterHasMovies', serializeFilterHasMovies(action), action.error);

    // Persons
    // ////////////////////

    case personActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'persons', action.personId ], action.data);
    case personActions.UPLOAD_PORTRAIT_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'persons', action.personId ], action.data);

    case personActions.PERSONS_FETCH_START:
      return searchStart(state, 'filterHasPersons', serializeFilterHasPersons(action));
    case personActions.PERSONS_FETCH_SUCCESS:
      return searchSuccess(state, 'listPersons', 'filterHasPersons', serializeFilterHasPersons(action), action.data.data);
    case personActions.PERSONS_FETCH_ERROR:
      return searchError(state, 'filterHasPersons', serializeFilterHasPersons(action), action.error);

    case personActions.PERSON_FETCH_START:
      return fetchStart(state, [ 'entities', 'persons', action.personId ]);
    case personActions.PERSON_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'persons', action.personId ], action.data);
    case personActions.PERSON_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'persons', action.personId ], action.error);

    case personActions.PERSON_SEARCH_START:
      return searchStart(state, 'searchStringHasPersons', action.searchString);
    case personActions.PERSON_SEARCH_SUCCESS:
      return searchSuccess(state, 'listPersons', 'searchStringHasPersons', action.searchString, action.data);
    case personActions.PERSON_SEARCH_ERROR:
      return searchError(state, 'searchStringHasPersons', action.searchString, action.error);

    case personActions.PERSON_FACE_IMAGES_FETCH_START:
      return searchStart(state, 'personHasFaceImages', action.personId);
    case personActions.PERSON_FACE_IMAGES_FETCH_SUCCESS:
      return searchSuccess(state, 'faceImages', 'personHasFaceImages', action.personId, action.data.data);
    case personActions.PERSON_FACE_IMAGES_FETCH_ERROR:
      return searchError(state, 'personHasFaceImages', action.personId, action.error);

    case personActions.TOPIC_FETCH_START:
      return fetchStart(state, [ 'entities', 'persons', action.personId ]);
    case personActions.TOPIC_FETCH_SUCCESS: {
      const newState = fetchSuccess(state, [ 'entities', 'topics', action.data.id ], action.data) || state;
      return fetchSuccess(newState, [ 'entities', 'persons', action.personId ], action.data);
    }
    case personActions.TOPIC_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'persons', action.personId ], action.error);

    // Products
    // ////////

    case productActions.UPLOAD_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'products', action.productId ], action.data);
    case productActions.DELETE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'products', action.productId ], action.data);

    case productActions.SUGGESTED_PRODUCTS_FETCH_START:
      return searchStart(state, 'imageHasSuggestedProducts', action.imageId);
    case productActions.SUGGESTED_PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'products', 'imageHasSuggestedProducts', action.imageId, action.data);
    case productActions.SUGGESTED_PRODUCTS_FETCH_ERROR:
      return searchError(state, 'imageHasSuggestedProducts', action.imageId, action.error);

    case productActions.PRODUCT_FETCH_START:
      return fetchStart(state, [ 'entities', 'products', action.productId ]);
    case productActions.PRODUCT_FETCH_SUCCESS: {
      const newState = action.data.brand && fetchSuccess(state, [ 'entities', 'listBrands', action.data.brand.id ], action.data.brand) || state;
      return fetchSuccess(newState, [ 'entities', 'products', action.productId ], action.data);
    }
    case productActions.PRODUCT_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'products', action.productId ], action.error);

    case productActions.PRODUCTS_FETCH_START:
      return searchStart(state, 'filterHasProducts', serializeFilterHasProducts(action));
    case productActions.PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'listProducts', 'filterHasProducts', serializeFilterHasProducts(action), action.data.data);
    case productActions.PRODUCTS_FETCH_ERROR:
      return searchError(state, 'filterHasProducts', serializeFilterHasProducts(action), action.error);

    case productActions.UNASSIGNED_PRODUCTS_FETCH_START:
      return searchStart(state, 'mediumHasUnassignedProducts', action.mediumId);
    case productActions.UNASSIGNED_PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'listProducts', 'mediumHasUnassignedProducts', action.mediumId, action.data);
    case productActions.UNASSIGNED_PRODUCTS_FETCH_ERROR:
      return searchError(state, 'mediumHasUnassignedProducts', action.mediumId, action.error);

    case productActions.PRODUCT_SEARCH_START:
      return searchStart(state, 'searchStringHasProducts', action.searchString);
    case productActions.PRODUCT_SEARCH_SUCCESS:
      return searchSuccess(state, 'listProducts', 'searchStringHasProducts', action.searchString, action.data);
    case productActions.PRODUCT_SEARCH_ERROR:
      return searchError(state, 'searchStringHasProducts', action.searchString, action.error);

    case productActions.PRODUCT_OFFERINGS_FETCH_START:
      return searchStart(state, 'productHasProductOfferings', action.productId);
    case productActions.PRODUCT_OFFERINGS_FETCH_SUCCESS: {
      let newState = state;
      if (action.data.data) {
        // Iterate through all the product offerings and extract the shop of every product offering.
        for (const productOffering of action.data.data) {
          newState = fetchSuccess(state, [ 'entities', 'listShops', productOffering.shop.id ], productOffering.shop);
        }
      }
      return searchSuccess(newState, 'productOfferings', 'productHasProductOfferings', action.productId, action.data.data);
    }
    case productActions.PRODUCT_OFFERINGS_FETCH_ERROR:
      return searchError(state, 'productHasProductOfferings', action.productId, action.error);

    case productActions.SIMILAR_PRODUCTS_FETCH_START:
      return searchStart(state, 'productHasSimilarProducts', action.productId);
    case productActions.SIMILAR_PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'similarProducts', 'productHasSimilarProducts', action.productId, action.data.data);
    case productActions.SIMILAR_PRODUCTS_FETCH_ERROR:
      return searchError(state, 'productHasSimilarProducts', action.productId, action.error);

    // Product categories
    // /////////////////

    case productCategoryActions.PRODUCT_CATEGORIES_FETCH_START:
      return searchStart(state, 'filterHasProductCategories', serializeFilterHasProductCategories(action));
    case productCategoryActions.PRODUCT_CATEGORIES_FETCH_SUCCESS:
      return searchSuccess(state, 'listProductCategories', 'filterHasProductCategories', serializeFilterHasProductCategories(action), action.data.data);
    case productCategoryActions.PRODUCT_CATEGORIES_FETCH_ERROR:
      return searchError(state, 'filterHasProductCategories', serializeFilterHasProductCategories(action), action.error);

    case productCategoryActions.PRODUCT_CATEGORIES_SEARCH_START:
      return searchStart(state, 'searchStringHasProductCategories', action.searchString);
    case productCategoryActions.PRODUCT_CATEGORIES_SEARCH_SUCCESS:
      return searchSuccess(state, 'listProductCategories', 'searchStringHasProductCategories', action.searchString, action.data);
    case productCategoryActions.PRODUCT_CATEGORIES_SEARCH_ERROR:
      return searchError(state, 'searchStringHasProductCategories', action.searchString, action.error);

    // Push notifications
    // /////////////////

    case pushNotificationActions.PUSH_NOTIFICATIONS_FETCH_START:
      return searchStart(state, 'filterHasPushNotifications', serializeFilterHasPushNotifications(action));
    case pushNotificationActions.PUSH_NOTIFICATIONS_FETCH_SUCCESS:
      return searchSuccess(state, 'pushNotifications', 'filterHasPushNotifications', serializeFilterHasPushNotifications(action), action.data.data);
    case pushNotificationActions.PUSH_NOTIFICATIONS_FETCH_ERROR:
      return searchError(state, 'filterHasPushNotifications', serializeFilterHasPushNotifications(action), action.error);
    case pushNotificationActions.PUSH_NOTIFICATION_FETCH_START:
      return fetchStart(state, [ 'entities', 'pushNotifications', action.pushNotificationId ]);
    case pushNotificationActions.PUSH_NOTIFICATION_FETCH_SUCCESS: {
      return fetchSuccess(state, [ 'entities', 'pushNotifications', action.pushNotificationId ], action.data);
    }
    case pushNotificationActions.PUSH_NOTIFICATION_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'pushNotifications', action.pushNotificationId ], action.error);

    case pushNotificationDestinationActions.PUSH_NOTIFICATION_DESTINATIONS_SEARCH_START:
      return searchStart(state, 'searchStringHasPushNotificationDestinations', action.searchString);
    case pushNotificationDestinationActions.PUSH_NOTIFICATION_DESTINATIONS_SEARCH_SUCCESS:
      return searchSuccess(state, 'listPushNotificationDestinations', 'searchStringHasPushNotificationDestinations', action.searchString, action.data);
    case pushNotificationDestinationActions.PUSH_NOTIFICATION_DESTINATIONS_SEARCH_ERROR:
      return searchError(state, 'searchStringHasPushNotificationDestinations', action.searchString, action.error);

    // Shops
    // /////////////////

    case shopActions.UPLOAD_LOGO_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'shops', action.shopId ], action.data);

    case shopActions.SHOP_FETCH_START:
      return fetchStart(state, [ 'entities', 'shops', action.shopId ]);
    case shopActions.SHOP_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'shops', action.shopId ], action.data);
    case shopActions.SHOP_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'shops', action.shopId ], action.error);

    case shopActions.SHOPS_FETCH_START:
      return searchStart(state, 'filterHasBrands', serializeFilterHasShops(action));
    case shopActions.SHOPS_FETCH_SUCCESS:
      return searchSuccess(state, 'listShops', 'filterHasShops', serializeFilterHasShops(action), action.data.data);
    case shopActions.SHOPS_FETCH_ERROR:
      return searchError(state, 'filterHasShops', serializeFilterHasShops(action), action.error);

    case shopActions.SHOP_SEARCH_START:
      return searchStart(state, 'searchStringHasShops', action.searchString);
    case shopActions.SHOP_SEARCH_SUCCESS:
      return searchSuccess(state, 'listShops', 'searchStringHasShops', action.searchString, action.data);
    case shopActions.SHOP_SEARCH_ERROR:
      return searchError(state, 'searchStringHasShops', action.searchString, action.error);

    case shopActions.MEDIUM_SHOP_SEARCH_START:
      return searchStart(state, 'mediumHasShops', action.mediumId);
    case shopActions.MEDIUM_SHOP_SEARCH_SUCCESS:
      return searchSuccess(state, 'listShops', 'mediumHasShops', action.mediumId, action.data);
    case shopActions.MEDIUM_SHOP_SEARCH_ERROR:
      return searchError(state, 'mediumHasShops', action.mediumId, action.error);

    // Seasons
    // /////////////////

    case seasonActions.UPLOAD_POSTER_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.seasonId ], action.data);
    case seasonActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.seasonId ], action.data);

    case seasonActions.SEASON_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.seasonId ]);
    case seasonActions.SEASON_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.seasonId ], action.data);
    case seasonActions.SEASON_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.seasonId ], action.error);

    case seasonActions.EPISODES_SEARCH_START:
      return searchStart(state, 'seasonHasEpisodes', action.seasonId);
    case seasonActions.EPISODES_SEARCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'seasonHasEpisodes', action.seasonId, action.data);
    case seasonActions.EPISODES_SEARCH_ERROR:
      return searchError(state, 'seasonHasEpisodes', action.seasonId, action.error);

    case seasonActions.SEASON_EPISODES_FETCH_START:
      return searchStart(state, 'seasonHasEpisodes', action.seasonId);
    case seasonActions.SEASON_EPISODES_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'seasonHasEpisodes', action.seasonId, action.data.data);
    case seasonActions.SEASON_EPISODES_FETCH_ERROR:
      return searchError(state, 'seasonHasEpisodes', action.seasonId, action.error);

    // Series Entries
    // //////////////

    case seriesActions.UPLOAD_POSTER_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.seriesEntryId ], action.data);
    case seriesActions.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.seriesEntryId ], action.data);
    case seriesActions.UPLOAD_ROUND_LOGO_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.seriesEntryId ], action.data);

    case seriesActions.SERIES_ENTRY_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.seriesEntryId ]);
    case seriesActions.SERIES_ENTRY_FETCH_SUCCESS:
      const data = action.data;
      const success = fetchSuccess(state, [ 'entities', 'listMedia', action.seriesEntryId ], {
        id: data.id,
        title: data.title[data.defaultLocale],
        posterImage: data.posterImage[data.defaultLocale],
        profileImage: data.profileImage[data.defaultLocale]
      });
      return fetchSuccess(success, [ 'entities', 'media', action.seriesEntryId ], data);
    case seriesActions.SERIES_ENTRY_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.seriesEntryId ], action.error);

    case seriesActions.SERIES_ENTRY_SEASONS_FETCH_START:
      return searchStart(state, 'seriesEntryHasSeasons', action.seriesEntryId);
    case seriesActions.SERIES_ENTRY_SEASONS_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'seriesEntryHasSeasons', action.seriesEntryId, action.data.data);
    case seriesActions.SERIES_ENTRY_SEASONS_FETCH_ERROR:
      return searchError(state, 'seriesEntryHasSeasons', action.seriesEntryId, action.error);

    case seriesActions.SERIES_ENTRY_EPISODES_FETCH_START:
      return searchStart(state, 'seriesEntryHasEpisodes', action.seriesEntryId);
    case seriesActions.SERIES_ENTRY_EPISODES_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'seriesEntryHasEpisodes', action.seriesEntryId, action.data.data);
    case seriesActions.SERIES_ENTRY_EPISODES_FETCH_ERROR:
      return searchError(state, 'seriesEntryHasEpisodes', action.seriesEntryId, action.error);

    case seriesActions.SERIES_ENTRIES_FETCH_START:
      return searchStart(state, 'filterHasSeriesEntries', serializeFilterHasSeriesEntries(action));
    case seriesActions.SERIES_ENTRIES_FETCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'filterHasSeriesEntries', serializeFilterHasSeriesEntries(action), action.data.data);
    case seriesActions.SERIES_ENTRIES_FETCH_ERROR:
      return searchError(state, 'filterHasSeriesEntries', serializeFilterHasSeriesEntries(action), action.error);

    case seriesActions.SERIES_ENTRIES_SEARCH_START:
      return searchStart(state, 'searchStringHasSeriesEntries', action.searchString);
    case seriesActions.SERIES_ENTRIES_SEARCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'searchStringHasSeriesEntries', action.searchString, action.data);
    case seriesActions.SERIES_ENTRIES_SEARCH_ERROR:
      return searchError(state, 'searchStringHasSeriesEntries', action.searchString, action.error);

    case seriesActions.SEASONS_SEARCH_START:
      return searchStart(state, 'seriesEntryHasSeasons', action.seriesEntryId);
    case seriesActions.SEASONS_SEARCH_SUCCESS:
      return searchSuccess(state, 'listMedia', 'seriesEntryHasSeasons', action.seriesEntryId, action.data);
    case seriesActions.SEASONS_SEARCH_ERROR:
      return searchError(state, 'seriesEntryHasSeasons', action.seriesEntryId, action.error);

    case spottActions.SPOTT_FETCH_START:
      return fetchStart(state, [ 'entities', 'spotts', action.spottId ]);
    case spottActions.SPOTT_FETCH_SUCCESS: {
      const { author, promotedForBrand, tags, topics } = action.data;
      const characters = tags.filter(({ entityType }) => entityType === 'CHARACTER').map(({ character }) => character);
      const persons = tags.filter(({ entityType }) => entityType === 'PERSON').map(({ person }) => person);
      const products = tags.filter(({ entityType }) => entityType === 'PRODUCT').map(({ product }) => product);

      let newState = mergeListOfEntities(state, [ 'entities', 'listCharacters' ], characters);
      newState = mergeListOfEntities(newState, [ 'entities', 'listPersons' ], persons);
      newState = mergeListOfEntities(newState, [ 'entities', 'listProducts' ], products);
      newState = topics && mergeListOfEntities(newState, [ 'entities', 'topics' ], topics) || newState;
      newState = promotedForBrand && fetchSuccess(newState, [ 'entities', 'listBrands', promotedForBrand.id ], promotedForBrand) || newState;
      newState = author && fetchSuccess(newState, [ 'entities', 'users', author.id ], author) || newState;

      return fetchSuccess(newState, [ 'entities', 'spotts', action.spottId ], action.data);
    }
    case spottActions.SPOTT_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.spottId ], action.error);

    case spottActions.SPOTTS_FETCH_START:
      return searchStart(state, 'filterHasSpotts', serializeFilterHasSpotts(action));
    case spottActions.SPOTTS_FETCH_SUCCESS:
      return searchSuccess(state, 'listSpotts', 'filterHasSpotts', serializeFilterHasSpotts(action), action.data.data);
    case spottActions.SPOTTS_FETCH_ERROR:
      return searchError(state, 'filterHasSpotts', serializeFilterHasSpotts(action), action.error);

    // Tags
    // //////////////

    case tagActions.TAG_FETCH_START:
      return fetchStart(state, [ 'entities', 'tags', action.tagId ]);
    case tagActions.TAG_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'tags', action.tagId ], action.data);
    case tagActions.TAG_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'tags', action.tagId ], action.error);

    case tagActions.TAGS_FETCH_START:
      return searchStart(state, 'filterHasTags', serializeFilterHasTags(action));
    case tagActions.TAGS_FETCH_SUCCESS:
      return searchSuccess(state, 'listTags', 'filterHasTags', serializeFilterHasTags(action), action.data.data);
    case tagActions.TAGS_FETCH_ERROR:
      return searchError(state, 'filterHasTags', serializeFilterHasTags(action), action.error);

    case tagActions.TAG_SEARCH_START:
      return searchStart(state, 'searchStringHasTags', action.searchString);
    case tagActions.TAG_SEARCH_SUCCESS:
      return searchSuccess(state, 'listTags', 'searchStringHasTags', action.searchString, action.data);
    case tagActions.TAG_SEARCH_ERROR:
      return searchError(state, 'searchStringHasTags', action.searchString, action.error);

    // Tv Guide
    // /////////////////

    case tvGuideActions.TV_GUIDE_ENTRIES_FETCH_START:
      return searchStart(state, 'filterHasTvGuideEntries', serializeFilterHasTvGuideEntries(action));
    case tvGuideActions.TV_GUIDE_ENTRIES_FETCH_SUCCESS:
      return searchSuccess(state, 'tvGuideEntries', 'filterHasTvGuideEntries', serializeFilterHasTvGuideEntries(action), action.data.data);
    case tvGuideActions.TV_GUIDE_ENTRIES_FETCH_ERROR:
      return searchError(state, 'filterHasTvGuideEntries', serializeFilterHasTvGuideEntries(action), action.error);

    case tvGuideActions.TV_GUIDE_ENTRY_FETCH_START:
      return fetchStart(state, [ 'entities', 'tvGuideEntries', action.tvGuideEntryId ]);
    case tvGuideActions.TV_GUIDE_ENTRY_FETCH_SUCCESS: {
      let newState = fetchSuccess(state, [ 'entities', 'tvGuideEntries', action.tvGuideEntryId ], action.data);
      if (action.data.medium.type === 'TV_SERIE_EPISODE') {
        newState = fetchSuccess(newState, [ 'entities', 'listMedia', action.data.serie.id ], action.data.serie);
        newState = fetchSuccess(newState, [ 'entities', 'listMedia', action.data.season.id ], action.data.season);
      }
      return fetchSuccess(newState, [ 'entities', 'listMedia', action.data.medium.id ], action.data.medium);
    }
    case tvGuideActions.TV_GUIDE_ENTRY_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'tvGuideEntries', action.tvGuideEntryId ], action.error);

    // Reporting
    // /////////

    case brandDashboardActions.EVENTS_FETCH_START:
      return fetchListStart(state, 'brandDashboardEvents');
    case brandDashboardActions.EVENTS_FETCH_SUCCESS:
      return fetchListSuccess(state, 'brandDashboardEvents', 'brandDashboardEvents', action.data);
    case brandDashboardActions.EVENTS_FETCH_ERROR:
      return fetchListError(state, 'brandDashboardEvents', action.error);

    case reportingActions.AGES_FETCH_START:
      return fetchListStart(state, 'ages');
    case reportingActions.AGES_FETCH_SUCCESS:
      return fetchListSuccess(state, 'ages', 'ages', action.data);
    case reportingActions.AGES_FETCH_ERROR:
      return fetchListError(state, 'ages', action.error);

    case reportingActions.EVENTS_FETCH_START:
      return fetchListStart(state, 'events');
    case reportingActions.EVENTS_FETCH_SUCCESS:
      return fetchListSuccess(state, 'events', 'events', action.data);
    case reportingActions.EVENTS_FETCH_ERROR:
      return fetchListError(state, 'events', action.error);

    case reportingActions.GENDERS_FETCH_START:
      return fetchListStart(state, 'genders');
    case reportingActions.GENDERS_FETCH_SUCCESS:
      return fetchListSuccess(state, 'genders', 'genders', action.data);
    case reportingActions.GENDERS_FETCH_ERROR:
      return fetchListError(state, 'genders', action.error);

    // Users
    // /////

    case userActions.USER_UPLOAD_PROFILE_IMAGE_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'users', action.userId ], action.data);

    case userActions.USER_FETCH_START:
      return fetchStart(state, [ 'entities', 'users', action.userId ]);
    case userActions.USER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'users', action.userId ], action.data);
    case userActions.USER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'users', action.userId ], action.error);

    case userActions.USERS_FETCH_START:
      return searchStart(state, 'filterHasUsers', serializeFilterHasUsers(action));
    case userActions.USERS_FETCH_SUCCESS:
      return searchSuccess(state, 'users', 'filterHasUsers', serializeFilterHasUsers(action), action.data.data);
    case userActions.USERS_FETCH_ERROR:
      return searchError(state, 'filterHasUsers', serializeFilterHasUsers(action), action.error);

    case userActions.USER_SEARCH_START:
      return searchStart(state, 'searchStringHasUsers', action.searchString);
    case userActions.USER_SEARCH_SUCCESS:
      return searchSuccess(state, 'users', 'searchStringHasUsers', action.searchString, action.data);
    case userActions.USER_SEARCH_ERROR:
      return searchError(state, 'searchStringHasUsers', action.searchString, action.error);

    // Videos
    // //////

    case videoActions.VIDEO_FETCH_START:
      return fetchStart(state, [ 'entities', 'videos', action.videoId ]);
    case videoActions.VIDEO_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'videos', action.videoId ], action.data);
    case videoActions.VIDEO_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'videos', action.videoId ], action.error);

    case videoActions.VIDEO_PROCESSORS_FETCH_START:
      return searchStart(state, 'filterHasInteractiveVideos', serializeFilterHasInteractiveVideos(action));
    case videoActions.VIDEO_PROCESSORS_FETCH_SUCCESS:
      return searchSuccess(state, 'interactiveVideos', 'filterHasInteractiveVideos', serializeFilterHasInteractiveVideos(action), action.data.data);
    case videoActions.VIDEO_PROCESSORS_FETCH_ERROR:
      return searchError(state, 'filterHasInteractiveVideos', serializeFilterHasInteractiveVideos(action), action.error);

    default:
      return state;
  }
};
