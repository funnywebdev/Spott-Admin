import React from 'react';
import { IndexRedirect, IndexRoute, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createStore from './createStore';
import { getAuthorizedConfig, init } from './actions/global';
import { LOGIN_SUCCESS } from './actions/user';
import { ADMIN, BRAND_REPRESENTATIVE, BROADCASTER, CONTENT_MANAGER } from './constants/userRoles';
import { TOGGLE_HOT_KEYS_INFO } from './tagger/actions/organizer';
import { COMMERCIAL, EPISODE, MOVIE } from './constants/mediumTypes';

import App from './pages/app';
import BrandsCreate from './pages/content/brands/create';
import BrandsEdit from './pages/content/brands/edit';
import BrandsList from './pages/content/brands/list';
import BrandsRead from './pages/content/brands/read';
import BroadcastChannelCreate from './pages/content/broadcastChannels/create';
import BroadcastChannelEdit from './pages/content/broadcastChannels/edit';
import BroadcastChannelList from './pages/content/broadcastChannels/list';
import BroadcastersCreate from './pages/content/broadcasters/create';
import BroadcastersEdit from './pages/content/broadcasters/edit';
import BroadcastersList from './pages/content/broadcasters/list';
import BroadcastersRead from './pages/content/broadcasters/read';
import CharactersCreate from './pages/content/characters/create';
import CharactersEdit from './pages/content/characters/edit';
import CharactersList from './pages/content/characters/list';
import CharactersRead from './pages/content/characters/read';
import CommercialsCreate from './pages/content/commercials/create';
import CommercialsEdit from './pages/content/commercials/edit';
import CommercialsList from './pages/content/commercials/list';
import CommercialsRead from './pages/content/commercials/read';
import ContentProducersCreate from './pages/content/contentProducers/create';
import ContentProducersEdit from './pages/content/contentProducers/edit';
import ContentProducersList from './pages/content/contentProducers/list';
import ContentProducersRead from './pages/content/contentProducers/read';
import EpisodeCreate from './pages/content/episodes/create';
import EpisodeEdit from './pages/content/episodes/edit';
import EpisodeList from './pages/content/episodes/list';
import EpisodeRead from './pages/content/episodes/read';
import Error404 from './pages/error404/main';
import ForgotPassword from './pages/forgotPassword';
import InteractiveVideoList from './pages/content/interactiveVideos/list';
import LinkUserToBrand from './pages/content/brands/read/users/linkUser';
import LinkUserToBroadcaster from './pages/content/broadcasters/read/users/linkUser';
import LinkUserToContentProducer from './pages/content/contentProducers/read/users/linkUser';
import Login from './pages/login';
import MediaHome from './pages/media/home';
import MediaList from './pages/content/media/list';
import MediaSinglePage from './pages/media/singlePage';
import MediaUpload from './pages/media/upload';
import MediaWelcome from './pages/media/welcome';
import MoviesCreate from './pages/content/movies/create';
import MoviesEdit from './pages/content/movies/edit';
import MoviesList from './pages/content/movies/list';
import MoviesRead from './pages/content/movies/read';
import PersonsCreate from './pages/content/persons/create';
import PersonsEdit from './pages/content/persons/edit';
import PersonsList from './pages/content/persons/list';
import PersonsRead from './pages/content/persons/read';
import ProductsCreate from './pages/content/products/create';
import ProductsEdit from './pages/content/products/edit';
import ProductsList from './pages/content/products/list';
import ProductsRead from './pages/content/products/read';
import PushNotificationsCreate from './pages/content/pushNotifications/create';
import PushNotificationsEdit from './pages/content/pushNotifications/edit';
import PushNotificationsList from './pages/content/pushNotifications/list';
import PushNotificationsRead from './pages/content/pushNotifications/read';
import Reporting from './pages/reporting';
import ReportingActivity from './pages/reporting/activity';
import ReportingBrandDashboard from './pages/reporting/brandDashboard';
import ReportingRankings from './pages/reporting/rankings';
import ResetPassword from './pages/resetPassword';
import SeasonCreate from './pages/content/seasons/create';
import SeasonEdit from './pages/content/seasons/edit';
import SeasonList from './pages/content/seasons/list';
import SeasonRead from './pages/content/seasons/read';
import SeriesCreate from './pages/content/series/create';
import SeriesEdit from './pages/content/series/edit';
import SeriesList from './pages/content/series/list';
import SeriesRead from './pages/content/series/read';
import SettingsCategoriesEdit from './pages/settings/categories/edit';
import DataLabelTypesCreate from './pages/settings/datalabeltypes/create';
import DataLabelTypesEdit from './pages/settings/datalabeltypes/edit';
import DataLabelTypesList from './pages/settings/datalabeltypes/list';
import DataLabelTypesRead from './pages/settings/datalabeltypes/read';
import DataLabelsCreate from './pages/settings/datalabels/create';
import DataLabelsEdit from './pages/settings/datalabels/edit';
import DataLabelsList from './pages/settings/datalabels/list';
import DataLabelsRead from './pages/settings/datalabels/read';
import ShopsCreate from './pages/content/shops/create';
import ShopsEdit from './pages/content/shops/edit';
import ShopsList from './pages/content/shops/list';
import ShopsRead from './pages/content/shops/read';
import SpottsCreate from './pages/content/spotts/create';
import SpottsEdit from './pages/content/spotts/edit';
import SpottsList from './pages/content/spotts/list';
import SpottsRead from './pages/content/spotts/read';
import TopicsCreate from './pages/content/topics/create';
import TopicsEdit from './pages/content/topics/edit';
import TopicsList from './pages/content/topics/list';
import TopicsRead from './pages/content/topics/read';
import TaggerApplication from './tagger/components/main';
import TvGuideCreateEntry from './pages/tvGuide/create';
import TvGuideEditEntry from './pages/tvGuide/edit';
import TvGuideList from './pages/tvGuide/list';
import UsersCreate from './pages/users/create';
import UsersEdit from './pages/users/edit';
import UsersList from './pages/users/list';
import UsersRead from './pages/users/read';
import VideoEdit from './pages/content/videos/edit';
import { authenticationTokenSelector, userRolesSelector } from './selectors/global';
import reducer from './reducers';

import { load as loadTvGuide } from './pages/tvGuide/list/actions';
import { load as loadMediumTvGuide } from './pages/content/_mediumTvGuide/actions';
import { load as loadBrandProducts } from './pages/content/brands/read/products/list/actions';
import { loadEpisodes } from './pages/content/series/read/episodes/actions';
/**
 * The application routes
 */
 /* eslint-disable react/prop-types */
function getRoutes ({ dispatch, getState }) {
  function requireOneRole (roles) {
    return (nextState, replace) => {
      const state = getState();
      if (!authenticationTokenSelector(state)) {
        return replace({ pathname: '/login', state: { returnTo: nextState.location } });
      }
      const currentRoles = userRolesSelector(state).toJS();
      let hasCorrectRoles = false;
      for (const role of currentRoles) {
        // If I have one of the roles, I'm authorized!
        hasCorrectRoles = hasCorrectRoles || roles.indexOf(role) > -1;
      }
      if (!hasCorrectRoles) {
        return replace({ pathname: '/', state: { returnTo: nextState.location } });
      }
    };
  }

  return (
    <Route component={App}>
      <Route component={MediaWelcome} path='/'>
        <Route component={Login} path='login' />
        <Route component={ForgotPassword} path='forgotpassword' />
        <Route component={ResetPassword} path='resetPassword' />
      </Route>

      {/* Tagger routes */}
      <Route path='tagger'>
        <Route
          component={TaggerApplication}
          mediumType={COMMERCIAL}
          path='commercial/:mediumId/video/:videoId'
          onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}/>
        <Route
          component={TaggerApplication}
          mediumType={MOVIE}
          path='movie/:mediumId/video/:videoId'
          onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}/>
        <Route
          component={TaggerApplication}
          mediumType={EPISODE}
          path='episode/:mediumId/video/:videoId'
          onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}/>
      </Route>

      <Route component={MediaSinglePage} path='media' onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}>
        <IndexRoute component={MediaHome}/>
        <Route component={MediaUpload} path='upload' />
      </Route>

      {/* TODO: update roles! */}
      <Route component={ReportingBrandDashboard} path='reporting/brand-dashboard' onEnter={requireOneRole([ BRAND_REPRESENTATIVE, CONTENT_MANAGER, ADMIN ])}/>
      <Route component={Reporting} path='reporting' onEnter={requireOneRole([ BROADCASTER, CONTENT_MANAGER, ADMIN ])}>
        <IndexRedirect to='activity' />
        <Route component={ReportingActivity} path='activity'/>
        <Route component={ReportingRankings} path='rankings'/>
      </Route>
      <Route path='content' onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}>
        <IndexRedirect to='content-producers' />
        <Route component={SpottsList} path='spotts'>
          <Route component={SpottsCreate} path ='create'/>
        </Route>
        <Route path='spotts'>
          <Route component={SpottsRead} path='read/:spottId'/>
          <Route component={SpottsEdit} path='edit/:spottId'/>
        </Route>
        <Route component={BrandsList} path='brands'>
          <Route component={BrandsCreate} path ='create'/>
        </Route>
        <Route path='brands'>
          <Route component={BrandsRead} path='read/:brandId'>
            <Route
              component={ProductsCreate}
              load={(props) => { dispatch(loadBrandProducts(props.location.query, props.params.brandId)); }}
              path='create/product'/>
            <Route component={LinkUserToBrand} path='link/user'/>
          </Route>
          <Route component={BrandsEdit} path='edit/:brandId'/>
        </Route>
        <Route component={BroadcastersList} path='broadcasters'>
          <Route component={BroadcastersCreate} path='create'/>
        </Route>
        <Route path='broadcasters'>
          <Route component={BroadcastersEdit} path='edit/:broadcasterId'/>
          <Route component={BroadcastersRead} path='read/:broadcasterId'>
            <Route component={BroadcastChannelCreate} path='create/broadcast-channel'/>
            <Route component={LinkUserToBroadcaster} path='link/user'/>
            <Route component={UsersCreate} path='create/user'/>
          </Route>
        </Route>
        <Route component={BroadcastChannelList} path='broadcast-channels'>
          <Route component={BroadcastChannelCreate} path='create'/>
        </Route>
        <Route path='broadcast-channels'>
          <Route component={BroadcastChannelEdit} path='edit/:id' />
        </Route>
        <Route component={CharactersList} path='characters'>
          <Route component={CharactersCreate} path='create'/>
        </Route>
        <Route path='characters'>
          <Route component={CharactersEdit} path='edit/:characterId'>
            <Route component={PersonsCreate} path='create/person'/>
          </Route>
          <Route component={CharactersRead} path='read/:characterId'/>
        </Route>
        <Route component={CommercialsList} path='commercials'>
          <Route component={CommercialsCreate} path='create'/>
        </Route>
        <Route path='commercials'>
          <Route component={CommercialsEdit} path='edit/:commercialId'/>
          <Route component={CommercialsRead} path='read/:commercialId'/>
        </Route>
        <Route component={ContentProducersList} path='content-producers'>
          <Route component={ContentProducersCreate} path='create'/>
        </Route>
        <Route path='content-producers'>
          <Route component={ContentProducersEdit} path='edit/:id'/>
          <Route component={ContentProducersRead} path='read/:id'>
            <Route component={LinkUserToContentProducer} path='link/user'/>
            <Route component={UsersCreate} path='create/user'/>
          </Route>
        </Route>
        <Route component={MoviesList} path='movies'>
          <Route component={MoviesCreate} path='create'/>
        </Route>
        <Route component={MediaList} path='media'>
          <Route component={SeriesCreate} path='create/seriesEntry'/>
          <Route component={SeasonCreate} path='create/season'/>
          <Route component={EpisodeCreate} path='create/episode'/>
          <Route component={CommercialsCreate} path='create/commercial'/>
        </Route>
        <Route path='movies'>
          <Route component={MoviesRead} path='read/:movieId'>
            <Route
              component={TvGuideCreateEntry}
              load={(props) => { dispatch(loadMediumTvGuide(props.location.query, props.params.movieId)); }}
              path='create/tv-guide'/>
          </Route>
          <Route path='read/:movieId'>
            <Route
              component={TvGuideEditEntry}
              getHierarchy={(props) => {
                const { params: { movieId }, currentTvGuideEntry } = props;
                return [
                    { title: 'Movies', url: '/content/movies' },
                    { title: currentTvGuideEntry.getIn([ 'medium', 'title' ]), url: `/content/movies/read/${movieId}` },
                    { title: 'TV Guide', url: props.location }
                ];
              }}
              path='tv-guide/edit/:tvGuideEntryId'/>
          </Route>
          <Route component={MoviesEdit} path='edit/:movieId'/>
        </Route>
        <Route component={PersonsList} path='persons'>
          <Route component={PersonsCreate} path ='create'/>
        </Route>
        <Route path='persons'>
          <Route component={PersonsRead} path='read/:personId'/>
          <Route component={PersonsEdit} path='edit/:personId'/>
        </Route>
        <Route component={VideoEdit} path='videos/edit/:videoId' onEnter={requireOneRole([ ADMIN ])}/>
        <Route component={SeriesList} path='series'>
          <Route component={SeriesCreate} path='create'/>
          <Route component={SeasonCreate} path='create/season'/>
          <Route component={EpisodeCreate} path='create/episode'/>
        </Route>
        <Route component={ProductsList} path='products'>
          <Route component={ProductsCreate} path ='create'/>
        </Route>
        <Route path='products'>
          <Route component={ProductsRead} path='read/:productId'/>
          <Route component={ProductsEdit} path='edit/:productId'/>
        </Route>
        <Route component={PushNotificationsList} path='push-notifications'>
          <Route component={PushNotificationsCreate} path='create'/>
        </Route>
        <Route component={InteractiveVideoList} path='interactive-videos'/>
        <Route path='push-notifications'>
          <Route component={PushNotificationsRead} path='read/:pushNotificationId'/>
          <Route component={PushNotificationsEdit} path='edit/:pushNotificationId'/>
        </Route>
        <Route component={ShopsList} path='shops'>
          <Route component={ShopsCreate} path ='create'/>
        </Route>
        <Route path='shops'>
          <Route component={ShopsRead} path='read/:shopId'/>
          <Route component={ShopsEdit} path='edit/:shopId'/>
        </Route>
        <Route path='series'>
          <Route component={SeriesRead} path='read/:seriesEntryId'>
            <Route component={SeasonCreate} path='create/season'/>
            <Route component={EpisodeCreate} loadEpisodesOfSeriesEntry={(props) => { dispatch(loadEpisodes(props.location.query, props.params.seriesEntryId)); }} path='create/episode'/>
            <Route
              component={TvGuideCreateEntry}
              load={(props) => { dispatch(loadMediumTvGuide(props.location.query, props.params.seriesEntryId)); }}
              path='create/tv-guide'/>
          </Route>
          <Route component={SeriesEdit} path='edit/:seriesEntryId' />
          <Route path='read/:seriesEntryId'>
            <Route
              component={TvGuideEditEntry}
              getHierarchy={(props) => {
                const { params: { seriesEntryId }, currentTvGuideEntry } = props;
                return [
                    { title: 'Series', url: '/content/series' },
                    { title: currentTvGuideEntry.getIn([ 'serie', 'title' ]), url: `/content/series/read/${seriesEntryId}` },
                    { title: 'TV Guide', url: props.location }
                ];
              }}
              path='tv-guide/edit/:tvGuideEntryId'/>
            <Route path='seasons'>
              <Route component={SeasonRead} path='read/:seasonId'>
                <Route component={EpisodeCreate} path='create/episode'/>
                <Route
                  component={TvGuideCreateEntry}
                  load={(props) => { dispatch(loadMediumTvGuide(props.location.query, props.params.seasonId)); }}
                  path='create/tv-guide'/>
              </Route>
              <Route component={SeasonEdit} path='edit/:seasonId'/>
              <Route path='read/:seasonId'>
              <Route
                component={TvGuideEditEntry}
                getHierarchy={(props) => {
                  const { params: { seriesEntryId, seasonId }, currentTvGuideEntry } = props;
                  return [
                      { title: 'Series', url: '/content/series' },
                      { title: currentTvGuideEntry.getIn([ 'serie', 'title' ]), url: `/content/series/read/${seriesEntryId}` },
                      { title: currentTvGuideEntry.getIn([ 'season', 'title' ]), url: `/content/series/read/${seriesEntryId}/seasons/read/${seasonId}` },
                      { title: 'TV Guide', url: props.location }
                  ];
                }}
                path='tv-guide/edit/:tvGuideEntryId'/>
                <Route path='episodes'>
                  <Route component={EpisodeRead} path='read/:episodeId'>
                    <Route
                      component={TvGuideCreateEntry}
                      load={(props) => { dispatch(loadMediumTvGuide(props.location.query, props.params.episodeId)); }}
                      path='create/tv-guide'/>
                  </Route>
                  <Route
                    component={TvGuideEditEntry}
                    getHierarchy={(props) => {
                      const { params: { seriesEntryId, seasonId, episodeId }, currentTvGuideEntry, location } = props;
                      return [
                          { title: 'Series', url: '/content/series' },
                          { title: currentTvGuideEntry.getIn([ 'serie', 'title' ]), url: `/content/series/read/${seriesEntryId}` },
                          { title: currentTvGuideEntry.getIn([ 'season', 'title' ]), url: `/content/series/read/${seriesEntryId}/seasons/read/${seasonId}` },
                          { title: currentTvGuideEntry.getIn([ 'medium', 'title' ]), url: `/content/series/read/${seriesEntryId}/seasons/read/${seasonId}/episodes/read/${episodeId}` },
                          { title: 'TV Guide', url: location }
                      ];
                    }}
                    path='read/:episodeId/tv-guide/edit/:tvGuideEntryId'/>
                  <Route component={EpisodeEdit} path='edit/:episodeId'/>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route component={SeasonList} path='seasons'>
          <Route component={SeasonCreate} path='create'/>
        </Route>
        <Route component={EpisodeList} path='episodes'>
          <Route component={EpisodeCreate} path='create'/>
        </Route>
        <Route component={TopicsList} path='topics'>
          <Route component={TopicsCreate} path='create'/>
        </Route>
        <Route path='topics'>
          <Route component={TopicsEdit} path='edit/:topicId'/>
          <Route component={TopicsRead} path='read/:topicId'/>
        </Route>
      </Route>

      <Route path='settings'>
        <Route component={SettingsCategoriesEdit} path='categories'/>
        <Route component={DataLabelTypesList} path='datalabeltypes'>
          <Route component={DataLabelTypesCreate} path='create'/>
        </Route>
        <Route path='datalabeltypes'>
          <Route component={DataLabelTypesEdit} path='edit/:datalabeltypeId'/>
          <Route component={DataLabelTypesRead} path='read/:datalabeltypeId'/>
        </Route>
        <Route component={DataLabelsList} path='datalabels'>
          <Route component={DataLabelsCreate} path='create'/>
        </Route>
        <Route path='datalabels'>
          <Route component={DataLabelsEdit} path='edit/:datalabelId'/>
          <Route component={DataLabelsRead} path='read/:datalabelId'/>
        </Route>
      </Route>
      {/* Users */}
      <Route component={UsersList} path='users' onEnter={requireOneRole([ ADMIN ])}>
        <Route component={UsersCreate} path='create'/>
      </Route>
      <Route path='users'>
        <Route component={UsersEdit} path='edit/:id'/>
        <Route component={UsersRead} path='read/:id'/>
      </Route>

      {/* TV Guide */}
      <Route component={TvGuideList} path='tv-guide' onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}>
        <Route
          component={TvGuideCreateEntry} load={(props) => { dispatch(loadTvGuide(props.location.query)); }} path='create' />
      </Route>
      <Route path='tv-guide' onEnter={requireOneRole([ CONTENT_MANAGER, ADMIN ])}>
        <Route
          component={TvGuideEditEntry}
          getHierarchy={(props) => [
            { title: 'TV Guide', url: '/tv-guide' },
            { title: props.currentTvGuideEntry.getIn([ 'medium', 'title' ]), url: props.location } ]}
          path='edit/:tvGuideEntryId'/>
      </Route>
      <Route component={Error404} path='*' />
    </Route>
  );
}
/* eslint-eanble react/prop-types */

/**
 * Bootstrap the application. Performs all necessary initializations.
 */
async function boot () {
  // Enable some stuff during development to ease debugging
  if (process.env.NODE_ENV !== 'production') {
    // For dev tool support, attach to window...
    window.React = React;
  }

  // Create redux store
  const store = createStore(hashHistory, reducer);

  // Create an enhanced history that syncs navigation events with the store.
  const browserHistory = syncHistoryWithStore(hashHistory, store, { selectLocationState: (state) => state.get('router') });

  // Initialize configuration: save base urls in state, etc.
  await store.dispatch(init());
  // Load session from local storage.
  if (localStorage) {
    const session = localStorage.getItem('session');
    const hotKeysInfoClosed = localStorage.getItem('hotKeysInfoClosed');
    if (session) {
      store.dispatch({ data: JSON.parse(session), type: LOGIN_SUCCESS });
    }
    if (hotKeysInfoClosed) {
      store.dispatch({ type: TOGGLE_HOT_KEYS_INFO });
    }
  }
  // if user is logged in, retrieve authorized config files (languages,...)
  await store.dispatch(getAuthorizedConfig());

  // Render application
  ReactDOM.render(
    <Provider key='provider' store={store}>
      <Router history={browserHistory}>
        {getRoutes(store)}
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

boot();
