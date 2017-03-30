import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormSubtitle } from '../../../_common/styles';
import TextInput from '../../../_common/inputs/textInput';
import ImageDropzone from '../../../_common/dropzone/imageDropzone';
import SelectInput from '../../../_common/inputs/selectInput';
import localized from '../../../_common/decorators/localized';
import PersistModal, { dialogStyle } from '../../../_common/components/persistModal';
import { FETCHING } from '../../../../constants/statusTypes';
import { POSTER_IMAGE } from '../../../../constants/imageTypes';
import { routerPushWithReturnTo } from '../../../../actions/global';
import { load as loadList } from '../list/actions';
import * as actions from './actions';
import selector from './selector';

function validate (values, { t }) {
  const validationErrors = {};
  const { defaultLocale, image, title } = values.toJS();
  if (!defaultLocale) { validationErrors.defaultLocale = t('common.errors.required'); }
  if (!title) { validationErrors.title = t('common.errors.required'); }
  if (!image) { validationErrors.image = t('common.errors.required'); }
  // Done
  return validationErrors;
}

@localized
@connect(selector, (dispatch) => ({
  load: bindActionCreators(loadList, dispatch),
  searchTopics: bindActionCreators(actions.searchTopics, dispatch),
  submit: bindActionCreators(actions.submit, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@reduxForm({
  form: 'spottCreate',
  validate
})
@Radium
export default class CreateSpottModal extends Component {

  static propTypes = {
    change: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.any,
    genders: ImmutablePropTypes.map.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    localeNames: ImmutablePropTypes.map.isRequired,
    location: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    searchTopics: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    topicsById: ImmutablePropTypes.map.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseClick = ::this.onCloseClick;
    this.submit = ::this.submit;
  }

  componentWillMount () {
    this.props.initialize({
      defaultLocale: this.props.currentLocale
    });
  }

  async submit (form) {
    try {
      const { load, location, submit, dispatch, change, reset } = this.props;
      await submit(form.toJS());
      const createAnother = form.get('createAnother');
      // Load the new list of items, using the location query of the previous page.
      const loc = location && location.state && location.state.returnTo;
      if (loc && loc.query) {
        load(loc.query);
      }
      if (createAnother) {
        await dispatch(reset());
        await dispatch(change('createAnother', true));
      } else {
        this.onCloseClick();
      }
    } catch (error) {
      throw new SubmissionError({ _error: 'common.errors.unexpected' });
    }
  }

  onCloseClick () {
    this.props.routerPushWithReturnTo('/content/spotts', true);
  }

  render () {
    const { change, dispatch, handleSubmit, localeNames, searchedTopicIds, searchTopics, topicsById } = this.props;
    return (
      <PersistModal createAnother isOpen style={{ ...dialogStyle, content: { ...dialogStyle.content, maxWidth: 620 } }} title='Add Spott' onClose={this.onCloseClick} onSubmit={handleSubmit(this.submit)}>
        <div style={{ display: 'flex' }}>
          <div style={{ paddingRight: 20, width: '100%' }}>
            <ImageDropzone
              accept='image/*'
              height={400}
              type={POSTER_IMAGE}
              onChange={({ callback, file }) => {
                dispatch(change('image', file));
                // Fake the progress...
                callback(1, 1);
              }}
              onDelete={() => dispatch(change('image', null))}/>
          </div>
          <div style={{ width: '100%' }}>
            <FormSubtitle first>Content</FormSubtitle>
            <Field
              component={SelectInput}
              filter={(option, filter) => {
                return option && filter ? localeNames.get(option.value).toLowerCase().indexOf(filter.toLowerCase()) !== -1 : true;
              }}
              getItemText={(language) => { return localeNames.get(language); }}
              label='Default language'
              name='defaultLocale'
              options={localeNames.keySeq().toArray()}
              placeholder='Default language'
              required/>
            <Field
              component={TextInput}
              label='Title'
              name='title'
              placeholder='Title'
              required/>
            <Field
              component={TextInput}
              label='Comment'
              name='comment'
              placeholder='Comment'/>
            <Field
              component={SelectInput}
              getItemText={(id) => topicsById.getIn([ id, 'text' ])}
              getOptions={searchTopics}
              isLoading={searchedTopicIds.get('_status') === FETCHING}
              label='Topics'
              multiselect
              name='topicIds'
              options={searchedTopicIds.get('data').toJS()}
              placeholder='Topics'/>
          </div>
        </div>
      </PersistModal>
    );
  }

}
