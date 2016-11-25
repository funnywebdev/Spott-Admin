import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormSubtitle } from '../../../_common/styles';
import TextInput from '../../../_common/inputs/textInput';
import localized from '../../../_common/localized';
import CreateModal from '../../../_common/createModal';
import { loadEpisodes } from '../../seasons/read/episodes/actions';
import * as actions from './actions';
import { routerPushWithReturnTo } from '../../../../actions/global';
import selector from './selector';
import SelectInput from '../../../_common/inputs/selectInput';
import { FETCHING } from '../../../../constants/statusTypes';

function validate (values, { t }) {
  const validationErrors = {};
  const { seriesEntryId, seasonId, defaultLocale, title } = values.toJS();
  if (!seriesEntryId) { validationErrors.seriesEntryId = t('common.errors.required'); }
  if (!seasonId) { validationErrors.seasonId = t('common.errors.required'); }
  if (!defaultLocale) { validationErrors.defaultLocale = t('common.errors.required'); }
  if (!title) { validationErrors.title = t('common.errors.required'); }
  // Done
  return validationErrors;
}

@localized
@connect(selector, (dispatch) => ({
  loadEpisodes: bindActionCreators(loadEpisodes, dispatch),
  submit: bindActionCreators(actions.submit, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  searchSeasons: bindActionCreators(actions.searchSeasons, dispatch),
  searchSeriesEntries: bindActionCreators(actions.searchSeriesEntries, dispatch)
}))
@reduxForm({
  form: 'episodesCreateEntry',
  validate
})
@Radium
export default class CreateEpisodentryModal extends Component {

  static propTypes = {
    change: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentSeasonId: PropTypes.string,
    currentSeriesEntryId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    loadEpisodes: PropTypes.func.isRequired,
    localeNames: ImmutablePropTypes.map.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    searchSeasons: PropTypes.func.isRequired,
    searchSeriesEntries: PropTypes.func.isRequired,
    searchedSeasonIds: ImmutablePropTypes.map.isRequired,
    searchedSeriesEntryIds: ImmutablePropTypes.map.isRequired,
    seasonsById: ImmutablePropTypes.map.isRequired,
    seriesEntriesById: ImmutablePropTypes.map.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseClick = ::this.onCloseClick;
    this.submit = ::this.submit;
  }

  async componentWillMount () {
    // We need to fetch seasons of a certain series. SelectInput component
    // will not do this automatically (cause we render first, and then initialize
    // our seasonId of our redux form).
    await this.props.searchSeasons(null, this.props.params.seriesEntryId);
    await this.props.initialize({
      seriesEntryId: this.props.params.seriesEntryId,
      seasonId: this.props.params.seasonId,
      defaultLocale: this.props.currentLocale
    });
  }

  async submit (form) {
    try {
      await this.props.submit(form.toJS());
      // Load the new list of items, using the location query of the previous page.
      const location = this.props.location && this.props.location.state && this.props.location.state.returnTo;
      if (location && location.query) {
        this.props.loadEpisodes(location.query, this.props.params.seasonId);
      }
      this.onCloseClick();
    } catch (error) {
      throw new SubmissionError({ _error: 'common.errors.unexpected' });
    }
  }

  onCloseClick () {
    this.props.routerPushWithReturnTo('content/series', true);
  }

  render () {
    const { localeNames, currentSeasonId, currentSeriesEntryId, searchSeriesEntries, seriesEntriesById, searchedSeriesEntryIds,
        searchSeasons, seasonsById, searchedSeasonIds, handleSubmit } = this.props;
    return (
      <CreateModal isOpen title='Create Episode Entry' onClose={this.onCloseClick} onSubmit={handleSubmit(this.submit)}>
        <FormSubtitle first>Content</FormSubtitle>
        <Field
          component={SelectInput}
          getItemText={(language) => localeNames.get(language)}
          getOptions={(language) => localeNames.keySeq().toArray()}
          label='Default language'
          name='defaultLocale'
          options={localeNames.keySeq().toArray()}
          placeholder='Default language'/>
        <Field
          component={SelectInput}
          getItemText={(id) => seriesEntriesById.getIn([ id, 'title' ])}
          getOptions={searchSeriesEntries}
          isLoading={searchedSeriesEntryIds.get('_status') === FETCHING}
          label='Series title'
          name='seriesEntryId'
          options={searchedSeriesEntryIds.get('data').toJS()}
          placeholder='Series title'
          onChange={() => {
            this.props.dispatch(this.props.change('seasonId', null));
          }} />
        {currentSeriesEntryId && <Field
          component={SelectInput}
          getItemText={(id) => seasonsById.getIn([ id, 'title' ])}
          getOptions={(searchString) => { searchSeasons(searchString, currentSeriesEntryId); }}
          isLoading={searchedSeasonIds.get('_status') === FETCHING}
          label='Season title'
          name='seasonId'
          options={searchedSeasonIds.get('data').toJS()}
          placeholder='Season title'
          onChange={() => {
            this.props.dispatch(this.props.change('title', null));
          }} />}
        {currentSeriesEntryId && currentSeasonId && <Field
          component={TextInput}
          label='Episode number'
          name='number'
          placeholder='Episode number'
          required/>}
      </CreateModal>
    );
  }

}
