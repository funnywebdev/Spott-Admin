import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { FETCHING } from '../../../../constants/statusTypes';
import { makeTextStyle, fontWeights, Root, FormSubtitle, colors, EditTemplate } from '../../../_common/styles';
import { routerPushWithReturnTo } from '../../../../actions/global';
import { Tabs, Tab } from '../../../_common/components/formTabs';
import { MOVIE_CREATE_LANGUAGE } from '../../../../constants/modalTypes';
import CreateLanguageModal from '../../_languageModal/create';
import Dropzone from '../../../_common/dropzone/imageDropzone';
import Label from '../../../_common/inputs/_label';
import localized from '../../../_common/decorators/localized';
import Section from '../../../_common/components/section';
import SelectInput from '../../../_common/inputs/selectInput';
import CheckboxInput from '../../../_common/inputs/checkbox';
import TextInput from '../../../_common/inputs/textInput';
import NumberInput from '../../../_common/inputs/numberInput';
import LanguageBar from '../../../_common/components/languageBar';
import Audiences from '../../_audiences/list';
import Availabilities from '../../_availabilities/list';
import RelatedVideo from '../../../content/_relatedVideo/read';
import Brands from '../../_helpers/_brands/list';
import Characters from '../../_helpers/_characters/list';
import Collections from '../../_collections/list';
import Shops from '../../_helpers/_shops/list';
import { POSTER_IMAGE, PROFILE_IMAGE, ROUND_LOGO } from '../../../../constants/imageTypes';
import ensureEntityIsSaved from '../../../_common/decorators/ensureEntityIsSaved';
import { SideMenu } from '../../../app/sideMenu';
import Header from '../../../app/multiFunctionalHeader';
import * as actions from './actions';
import selector from './selector';

const formName = 'movieEdit';

function validate (values, { t }) {
  const validationErrors = {};
  const { _activeLocale, defaultLocale, title } = values.toJS();
  if (!defaultLocale) { validationErrors.defaultLocale = t('common.errors.required'); }
  if (title && !title[_activeLocale]) { validationErrors.title = validationErrors.title || {}; validationErrors.title[_activeLocale] = t('common.errors.required'); }
  // Done
  return validationErrors;
}

// Decorators in this sequence!
@localized
@connect(selector, (dispatch) => ({
  closePopUpMessage: bindActionCreators(actions.closePopUpMessage, dispatch),
  closeModal: bindActionCreators(actions.closeModal, dispatch),
  deletePosterImage: bindActionCreators(actions.deletePosterImage, dispatch),
  deleteProfileImage: bindActionCreators(actions.deleteProfileImage, dispatch),
  deleteRoundLogo: bindActionCreators(actions.deleteRoundLogo, dispatch),
  loadMovie: bindActionCreators(actions.loadMovie, dispatch),
  openModal: bindActionCreators(actions.openModal, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  searchAudienceCountries: bindActionCreators(actions.searchAudienceCountries, dispatch),
  searchAudienceLanguages: bindActionCreators(actions.searchAudienceLanguages, dispatch),
  searchHelpersBrands: bindActionCreators(actions.searchHelpersBrands, dispatch),
  searchHelpersCharacters: bindActionCreators(actions.searchHelpersCharacters, dispatch),
  searchHelpersShops: bindActionCreators(actions.searchHelpersShops, dispatch),
  searchBroadcasters: bindActionCreators(actions.searchBroadcasters, dispatch),
  searchCollectionsBrands: bindActionCreators(actions.searchCollectionsBrands, dispatch),
  searchCollectionsCharacters: bindActionCreators(actions.searchCollectionsCharacters, dispatch),
  searchCollectionsProducts: bindActionCreators(actions.searchCollectionsProducts, dispatch),
  searchContentProducers: bindActionCreators(actions.searchContentProducers, dispatch),
  searchMediumCategories: bindActionCreators(actions.searchMediumCategories, dispatch),
  submit: bindActionCreators(actions.submit, dispatch),
  uploadPosterImage: bindActionCreators(actions.uploadPosterImage, dispatch),
  uploadProfileImage: bindActionCreators(actions.uploadProfileImage, dispatch),
  uploadRoundLogo: bindActionCreators(actions.uploadRoundLogo, dispatch)
}))
@reduxForm({
  form: formName,
  validate
})
@ensureEntityIsSaved
@Radium
export default class EditMovie extends Component {

  static propTypes = {
    _activeLocale: PropTypes.string,
    brandsById: ImmutablePropTypes.map.isRequired,
    broadcastersById: ImmutablePropTypes.map.isRequired,
    change: PropTypes.func.isRequired,
    characters: ImmutablePropTypes.list,
    charactersById: ImmutablePropTypes.map.isRequired,
    children: PropTypes.node,
    closeModal: PropTypes.func.isRequired,
    closePopUpMessage: PropTypes.func.isRequired,
    contentProducersById: ImmutablePropTypes.map.isRequired,
    currentModal: PropTypes.string,
    currentMovie: ImmutablePropTypes.map.isRequired,
    defaultLocale: PropTypes.string,
    deletePosterImage: PropTypes.func.isRequired,
    deleteProfileImage: PropTypes.func.isRequired,
    deleteRoundLogo: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.any,
    errors: PropTypes.object,
    formValues: ImmutablePropTypes.map,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    loadMovie: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    mediumCategoriesById: ImmutablePropTypes.map.isRequired,
    movieBrands: ImmutablePropTypes.map.isRequired,
    movieCharacters: ImmutablePropTypes.map.isRequired,
    movieCollections: ImmutablePropTypes.map.isRequired,
    movieShops: ImmutablePropTypes.map.isRequired,
    openModal: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    popUpMessage: PropTypes.object,
    productsById: ImmutablePropTypes.map.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    searchAudienceCountries: PropTypes.func.isRequired,
    searchAudienceLanguages: PropTypes.func.isRequired,
    searchBroadcasters: PropTypes.func.isRequired,
    searchCollectionsBrands: PropTypes.func.isRequired,
    searchCollectionsCharacters: PropTypes.func.isRequired,
    searchCollectionsProducts: PropTypes.func.isRequired,
    searchContentProducers: PropTypes.func.isRequired,
    searchHelpersBrands: PropTypes.func.isRequired,
    searchHelpersCharacters: PropTypes.func.isRequired,
    searchHelpersShops: PropTypes.func.isRequired,
    searchMediumCategories: PropTypes.func.isRequired,
    searchedAudienceCountryIds: ImmutablePropTypes.map.isRequired,
    searchedAudienceLanguageIds: ImmutablePropTypes.map.isRequired,
    searchedBroadcasterIds: ImmutablePropTypes.map.isRequired,
    searchedCollectionsBrandIds: ImmutablePropTypes.map.isRequired,
    searchedCollectionsCharacterIds: ImmutablePropTypes.map.isRequired,
    searchedCollectionsProductIds: ImmutablePropTypes.map.isRequired,
    searchedContentProducerIds: ImmutablePropTypes.map.isRequired,
    searchedHelpersBrandIds: ImmutablePropTypes.map.isRequired,
    searchedHelpersCharacterIds: ImmutablePropTypes.map.isRequired,
    searchedHelpersShopIds: ImmutablePropTypes.map.isRequired,
    searchedMediumCategoryIds: ImmutablePropTypes.map.isRequired,
    shopsById: ImmutablePropTypes.map.isRequired,
    submit: PropTypes.func.isRequired,
    supportedLocales: ImmutablePropTypes.list,
    t: PropTypes.func.isRequired,
    uploadPosterImage: PropTypes.func.isRequired,
    uploadProfileImage: PropTypes.func.isRequired,
    uploadRoundLogo: PropTypes.func.isRequired,
    onBeforeChangeTab: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.submit = ::this.submit;
    this.redirect = ::this.redirect;
    this.onSetDefaultLocale = ::this.onSetDefaultLocale;
    this.openCreateLanguageModal = :: this.openCreateLanguageModal;
    this.languageAdded = :: this.languageAdded;
    this.removeLanguage = :: this.removeLanguage;
  }

  async componentWillMount () {
    const { movieId } = this.props.params;
    if (movieId) {
      const editObj = await this.props.loadMovie(movieId);
      this.props.initialize({
        ...editObj,
        contentProducers: editObj.contentProducers && editObj.contentProducers.map((bc) => bc.id),
        broadcasters: editObj.broadcasters && editObj.broadcasters.map((bc) => bc.id),
        _activeLocale: editObj.defaultLocale
      });
    }
  }

  redirect () {
    this.props.routerPushWithReturnTo('/content/movies', true);
  }

  languageAdded (form) {
    const { language, title } = form && form.toJS();
    const { closeModal, supportedLocales } = this.props;
    const formValues = this.props.formValues.toJS();
    if (language) {
      const newSupportedLocales = supportedLocales.push(language);
      this.submit(fromJS({
        ...formValues,
        locales: newSupportedLocales.toJS(),
        _activeLocale: language,
        title: { ...formValues.title, [language]: title }
      }));
    }
    closeModal();
  }

  removeLanguage () {
    const { dispatch, change, supportedLocales, _activeLocale, defaultLocale } = this.props;
    if (_activeLocale) {
      const newSupportedLocales = supportedLocales.delete(supportedLocales.indexOf(_activeLocale));
      dispatch(change('locales', newSupportedLocales));
      dispatch(change('_activeLocale', defaultLocale));
    }
  }

  openCreateLanguageModal () {
    if (this.props.onBeforeChangeTab()) {
      this.props.openModal(MOVIE_CREATE_LANGUAGE);
    }
  }

  async submit (form) {
    const { initialize, params: { movieId } } = this.props;
    try {
      await this.props.submit({
        ...form.toJS(),
        movieId
      });
      await initialize(form.toJS());
    } catch (error) {
      throw new SubmissionError({ _error: 'common.errors.unexpected' });
    }
  }

  onSetDefaultLocale (locale) {
    const { change, dispatch, _activeLocale } = this.props;
    dispatch(change('defaultLocale', _activeLocale));
  }

  static styles = {
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: '20px',
      paddingBottom: '20px',
      paddingLeft: '22.5px',
      paddingRight: '22.5px'
    },
    selectInput: {
      paddingTop: 0,
      width: '180px'
    },
    background: {
      backgroundColor: colors.lightGray4
    },
    paddingTop: {
      paddingTop: '1.25em'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: -20
    },
    backgroundRoot: {
      backgroundColor: colors.lightGray4,
      paddingBottom: '50px'
    },
    baseLanguageButton: {
      paddingTop: '3px',
      paddingBottom: '3px',
      ...makeTextStyle(fontWeights.regular, '11px')
    },
    removeLanguageButton: {
      width: '20px',
      height: '21px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '2px'
    },
    removeLanguageButtonPadding: {
      paddingLeft: '10px'
    },
    paddingUploadImage: {
      paddingBottom: 20,
      paddingRight: 24
    },
    customTitle: {
      paddingBottom: '0.438em'
    },
    titleLabel: {
      paddingBottom: '0.7em'
    }
  }

  render () {
    const styles = this.constructor.styles;
    const {
      _activeLocale, brandsById, broadcastersById, charactersById,
      closeModal, contentProducersById, currentModal, currentMovie,
      defaultLocale, deletePosterImage, location: { query: { tab } },
      deleteProfileImage, deleteRoundLogo, errors, handleSubmit, location, mediumCategoriesById,
      movieBrands, movieCharacters, movieCollections, movieShops, productsById, shopsById,
      searchAudienceCountries, searchAudienceLanguages, searchHelpersBrands,
      searchCollectionsBrands, searchCollectionsCharacters, searchCollectionsProducts,
      searchHelpersCharacters, searchHelpersShops, searchBroadcasters, searchContentProducers,
      searchedAudienceCountryIds, searchedAudienceLanguageIds, searchedHelpersBrandIds,
      searchedBroadcasterIds, searchedHelpersCharacterIds,
      searchedCollectionsBrandIds, searchedCollectionsCharacterIds, searchedCollectionsProductIds,
      searchedContentProducerIds, searchedMediumCategoryIds, searchMediumCategories,
      searchedHelpersShopIds, supportedLocales
    } = this.props;

    return (
      <SideMenu>
        <Root style={styles.backgroundRoot}>
          <Header hierarchy={[
            { title: 'Movies', url: '/content/movies' },
            { title: currentMovie.getIn([ 'title', defaultLocale ]), url: location } ]}/>
          {currentModal === MOVIE_CREATE_LANGUAGE &&
            <CreateLanguageModal
              supportedLocales={supportedLocales}
              onCloseClick={closeModal}
              onCreate={this.languageAdded}>
                <div>
                  <Field
                    component={TextInput}
                    label='Movie title'
                    labelStyle={styles.titleLabel}
                    name='title'
                    placeholder='Movie title'
                    required />
                </div>
            </CreateLanguageModal>}
          <EditTemplate disableSubmit={tab > 1} onCancel={this.redirect} onSubmit={handleSubmit(this.submit)}>
            <Tabs activeTab={tab} showPublishStatus onBeforeChange={this.props.onBeforeChangeTab} onChange={this.props.onChangeTab}>
              <Tab title='Details'>
                <Section noPadding style={styles.background}>
                  <LanguageBar
                    _activeLocale={_activeLocale}
                    defaultLocale={defaultLocale}
                    errors={errors}
                    openCreateLanguageModal={this.openCreateLanguageModal}
                    removeLanguage={this.removeLanguage}
                    supportedLocales={supportedLocales}
                    onSetDefaultLocale={this.onSetDefaultLocale}/>
                </Section>
                <Section clearPopUpMessage={this.props.closePopUpMessage} popUpObject={this.props.popUpMessage} >
                  <FormSubtitle first>General</FormSubtitle>
                  <Field
                    component={TextInput}
                    label='Movie title'
                    labelStyle={styles.titleLabel}
                    name={`title.${_activeLocale}`}
                    placeholder='Movie title'
                    required />
                  <Field
                    component={TextInput}
                    label='Movie subtitle'
                    labelStyle={styles.titleLabel}
                    name={`subTitle.${_activeLocale}`}
                    placeholder='Movie subtitle'/>
                  <Field
                    component={NumberInput}
                    label='Start year'
                    labelStyle={styles.titleLabel}
                    name={`startYear.${_activeLocale}`}
                    placeholder='Start year'/>
                  <Field
                    component={NumberInput}
                    label='End year'
                    labelStyle={styles.titleLabel}
                    name={`endYear.${_activeLocale}`}
                    placeholder='End year'/>
                  <Field
                    component={SelectInput}
                    disabled={_activeLocale !== defaultLocale}
                    getItemText={(mediumCategory) => mediumCategoriesById.getIn([ mediumCategory, 'name' ])}
                    getOptions={searchMediumCategories}
                    isLoading={searchedMediumCategoryIds.get('_status') === FETCHING}
                    label='Genres'
                    multiselect
                    name='mediumCategories'
                    options={searchedMediumCategoryIds.get('data').toJS()}
                    placeholder='Genres'/>
                  <Field
                    component={TextInput}
                    label='Description'
                    name={`description.${_activeLocale}`}
                    placeholder='Description'
                    type='multiline'/>
                  <Field
                    component={SelectInput}
                    disabled={_activeLocale !== defaultLocale}
                    getItemText={(contentProducerId) => contentProducersById.getIn([ contentProducerId, 'name' ])}
                    getOptions={searchContentProducers}
                    isLoading={searchedContentProducerIds.get('_status') === FETCHING}
                    label='Content producers'
                    multiselect
                    name='contentProducers'
                    options={searchedContentProducerIds.get('data').toJS()}
                    placeholder='Content producers'/>
                  <Field
                    component={SelectInput}
                    disabled={_activeLocale !== defaultLocale}
                    getItemText={(broadcasterId) => broadcastersById.getIn([ broadcasterId, 'name' ])}
                    getOptions={searchBroadcasters}
                    isLoading={searchedBroadcasterIds.get('_status') === FETCHING}
                    label='Broadcasters'
                    multiselect
                    name='broadcasters'
                    options={searchedBroadcasterIds.get('data').toJS()}
                    placeholder='Broadcaster companies'/>
                  <Field
                    component={CheckboxInput}
                    label='Enable live collections'
                    name='live' />
                  <FormSubtitle>Images</FormSubtitle>
                  <div style={[ styles.paddingTop, styles.row ]}>
                    <div style={styles.paddingUploadImage}>
                      <Label text='Poster image' />
                      <Dropzone
                        accept='image/*'
                        downloadUrl={
                          currentMovie.getIn([ 'posterImage', _activeLocale, 'url' ]) ||
                          currentMovie.getIn([ 'posterImage', defaultLocale, 'url' ])}
                        imageUrl={currentMovie.getIn([ 'posterImage', _activeLocale ]) &&
                          `${currentMovie.getIn([ 'posterImage', _activeLocale, 'url' ])}?height=459&width=310` ||
                          currentMovie.getIn([ 'posterImage', defaultLocale ]) &&
                          `${currentMovie.getIn([ 'posterImage', defaultLocale, 'url' ])}?height=459&width=310`}
                        showOnlyUploadedImage
                        type={POSTER_IMAGE}
                        onChange={({ callback, file }) => { this.props.uploadPosterImage({ locale: _activeLocale, movieId: this.props.params.movieId, image: file, callback }); }}
                        onDelete={currentMovie.getIn([ 'posterImage', _activeLocale, 'url' ]) ? () => { deletePosterImage({ locale: _activeLocale, mediumId: currentMovie.get('id') }); } : null}/>
                    </div>
                    <div style={styles.paddingUploadImage}>
                      <Label text='Profile image' />
                      <Dropzone
                        downloadUrl={currentMovie.getIn([ 'profileImage', _activeLocale, 'url' ]) ||
                          currentMovie.getIn([ 'profileImage', defaultLocale, 'url' ])}
                        imageUrl={currentMovie.getIn([ 'profileImage', _activeLocale ]) &&
                          `${currentMovie.getIn([ 'profileImage', _activeLocale, 'url' ])}?height=203&width=360` ||
                          currentMovie.getIn([ 'profileImage', defaultLocale ]) &&
                          `${currentMovie.getIn([ 'profileImage', defaultLocale, 'url' ])}?height=203&width=360`}
                        showOnlyUploadedImage
                        type={PROFILE_IMAGE}
                        onChange={({ callback, file }) => { this.props.uploadProfileImage({ locale: _activeLocale, movieId: this.props.params.movieId, image: file, callback }); }}
                        onDelete={currentMovie.getIn([ 'profileImage', _activeLocale, 'url' ]) ? () => { deleteProfileImage({ locale: _activeLocale, mediumId: currentMovie.get('id') }); } : null}/>
                    </div>
                    <div style={styles.paddingUploadImage}>
                      <Label text='Circle graphic' />
                      <Dropzone
                        downloadUrl={currentMovie.getIn([ 'roundLogo', _activeLocale, 'url' ]) ||
                          currentMovie.getIn([ 'roundLogo', defaultLocale, 'url' ])}
                        imageUrl={currentMovie.getIn([ 'roundLogo', _activeLocale ]) &&
                          `${currentMovie.getIn([ 'roundLogo', _activeLocale, 'url' ])}?height=203&width=203` ||
                          currentMovie.getIn([ 'roundLogo', defaultLocale ]) &&
                          `${currentMovie.getIn([ 'roundLogo', defaultLocale, 'url' ])}?height=203&width=203`}
                        showOnlyUploadedImage
                        type={ROUND_LOGO}
                        onChange={({ callback, file }) => { this.props.uploadRoundLogo({ locale: _activeLocale, movieId: this.props.params.movieId, image: file, callback }); }}
                        onDelete={currentMovie.getIn([ 'roundLogo', _activeLocale, 'url' ]) ? () => { deleteRoundLogo({ locale: _activeLocale, mediumId: currentMovie.get('id') }); } : null}/>
                    </div>
                  </div>
                </Section>
              </Tab>
             <Tab title='Cast'>
                <Characters
                  charactersById={charactersById}
                  mediumCharacters={movieCharacters}
                  mediumId={this.props.params.movieId}
                  searchCharacters={searchHelpersCharacters}
                  searchedCharacterIds={searchedHelpersCharacterIds} />
              </Tab>
              <Tab title='Helpers'>
                <Shops
                  mediumId={this.props.params.movieId}
                  mediumShops={movieShops}
                  searchShops={searchHelpersShops}
                  searchedShopIds={searchedHelpersShopIds}
                  shopsById={shopsById}/>
                 <Brands
                   brandsById={brandsById}
                   mediumBrands={movieBrands}
                   mediumId={this.props.params.movieId}
                   searchBrands={searchHelpersBrands}
                   searchedBrandIds={searchedHelpersBrandIds} />
               </Tab>
              <Tab title='Interactive video'>
                <Section>
                  <FormSubtitle first>Interactive video</FormSubtitle>
                  <Field
                    component={RelatedVideo}
                    medium={currentMovie}
                    name='videoId' />
                </Section>
              </Tab>
              <Tab title='Collections'>
                <Collections
                  brandsById={brandsById}
                  charactersById={charactersById}
                  mediumCollections={movieCollections}
                  mediumId={this.props.params.movieId}
                  productsById={productsById}
                  searchBrands={searchCollectionsBrands}
                  searchCharacters={searchCollectionsCharacters}
                  searchProducts={searchCollectionsProducts}
                  searchedBrandIds={searchedCollectionsBrandIds}
                  searchedCharacterIds={searchedCollectionsCharacterIds}
                  searchedProductIds={searchedCollectionsProductIds}/>
              </Tab>
              <Tab title='Availability'>
                <Availabilities mediumId={this.props.params.movieId} />
              </Tab>
              <Tab title='Audience'>
                <Audiences
                  mediumId={this.props.params.movieId}
                  searchCountries={searchAudienceCountries}
                  searchLanguages={searchAudienceLanguages}
                  searchedCountryIds={searchedAudienceCountryIds}
                  searchedLanguageIds={searchedAudienceLanguageIds}/>
              </Tab>
            </Tabs>
          </EditTemplate>
        </Root>
      </SideMenu>
    );
  }
}
