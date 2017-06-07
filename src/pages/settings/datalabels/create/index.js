import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormSubtitle } from '../../../_common/styles';
import TextInput from '../../../_common/inputs/textInput';
import SelectInput from '../../../_common/inputs/selectInput';
import localized from '../../../_common/decorators/localized';
import PersistModal from '../../../_common/components/persistModal';
import { load as loadList } from '../list/actions';
import { loadAll as loadTypes } from '../../datalabeltypes/list/actions';
import selector from '../../datalabeltypes/list/selector';
import * as actions from './actions';
import { routerPushWithReturnTo } from '../../../../actions/global';

function validate (values, { t }) {
  const validationErrors = {};
  const { name } = values.toJS();
  if (!name) { validationErrors.name = t('common.errors.required'); }
  // Done
  return validationErrors;
}

@localized
@connect(selector, (dispatch) => ({
  load: bindActionCreators(loadList, dispatch),
  submit: bindActionCreators(actions.submit, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  loadTypes: bindActionCreators(loadTypes, dispatch),
}))
@reduxForm({
  form: 'datalabelsCreateEntry',
  validate
})
@Radium
export default class CreateDatalabelEntryModal extends Component {

  static propTypes = {
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    loadTypes: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    datalabeltypes: ImmutablePropTypes.map.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseClick = ::this.onCloseClick;
    this.submit = ::this.submit;
  }

  async componentWillMount () {
    await this.props.loadTypes();
  }

  async submit (form) {
    try {
      const { load, location, dispatch, change, reset } = this.props;
      await this.props.submit(form.toJS());
      const createAnother = form.get('createAnother');
      // Load the new list of items, using the location query of the previous page.
      const loc = location && location.state && location.state.returnTo;
      if (loc && loc.query) {
        await load(loc.query);
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
    this.props.routerPushWithReturnTo('/settings/datalabels', true);
  }

  render () {
    const { handleSubmit, datalabeltypes } = this.props;
    console.log(datalabeltypes.get('data').toJS(), datalabeltypes.getIn([ 'data' ]));
    const types = datalabeltypes.get('data').toJS();
    return (
      <PersistModal createAnother isOpen title='Create Datalabel'
        onClose={this.onCloseClick} onSubmit={handleSubmit(this.submit)}>
        <FormSubtitle first>Content</FormSubtitle>
        <Field
          component={TextInput}
          label='Name'
          name='name'
          placeholder='Name datalabel'
          required/>
        <Field
          component={SelectInput}
          getItemText={(data) => data.name}
          name='type'
          options={types}
          required/>
      </PersistModal>
    );
  }

}
