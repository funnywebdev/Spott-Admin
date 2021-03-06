import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { connect } from 'react-redux';
import PersistModal from '../../../_common/components/persistModal';
import SelectInput from '../../../_common/inputs/selectInput';
import selector from './selector';
import localized from '../../../_common/decorators/localized';
import { bindActionCreators } from 'redux';
import { routerPushWithReturnTo } from '../../../../actions/global';

function validate (values, { t }) {
  const validationErrors = {};
  const { language } = values.toJS();
  if (!language) { validationErrors.language = t('common.errors.required'); }
  // Done
  return validationErrors;
}

@localized
@connect(selector, (dispatch) => ({
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@reduxForm({
  form: 'addLanguage',
  validate
})
@Radium
export default class CreateLanguageModal extends Component {

  static propTypes = {
    children: PropTypes.node,
    filteredLocales: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    localeNames: ImmutablePropTypes.map.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    supportedLocales: ImmutablePropTypes.list.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  };

  render () {
    const { onCloseClick, onCreate, localeNames, handleSubmit, filteredLocales, children } = this.props;
    return (
      <PersistModal isOpen title='Add language' onClose={onCloseClick} onSubmit={handleSubmit(onCreate)}>
        <Field
          component={SelectInput}
          filter={(option, filter) => {
            return option && filter ? localeNames.get(option.value).toLowerCase().indexOf(filter.toLowerCase()) !== -1 : true;
          }}
          first
          getItemText={(language) => (localeNames.get(language))}
          label= 'Add language'
          name='language'
          options={filteredLocales}
          placeholder='Language'
          required />
        {children}
      </PersistModal>
    );
  }

}
