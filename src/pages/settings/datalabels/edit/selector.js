import { createStructuredSelector } from 'reselect';
import { currentModalSelector } from '../../../../selectors/global';
import { createFormValueSelector } from '../../../../utils';
import { listProductLabelsEntitiesSelector, createEntityByIdSelector } from '../../../../selectors/data';
import { datalabeltypesSelector } from '../../datalabeltypes/list/selector';

export const currentDatalabelIdSelector = (state, props) => props.params.datalabelId;
export const currentDatalabelSelector = createEntityByIdSelector(listProductLabelsEntitiesSelector, currentDatalabelIdSelector);

const formName = 'datalabelEdit';
const formErrorsSelector = (state) => { return state.getIn([ 'form', formName, 'syncErrors' ]); };

const valuesSelector = (state) => state.getIn([ 'form', formName, 'values' ]);
const currentDefaultLocaleSelector = createFormValueSelector(formName, 'defaultLocale');
const _activeLocaleSelector = createFormValueSelector(formName, '_activeLocale');
const supportedLocalesSelector = createFormValueSelector(formName, 'locales');

const popUpMessageSelector = (state) => state.getIn([ 'content', 'brands', 'edit', 'popUpMessage' ]);

export default createStructuredSelector({
  _activeLocale: _activeLocaleSelector,
  currentDatalabel: currentDatalabelSelector,
  currentModal: currentModalSelector,
  datalabeltypes: datalabeltypesSelector,
  defaultLocale: currentDefaultLocaleSelector,
  errors: formErrorsSelector,
  formValues: valuesSelector,
  popUpMessage: popUpMessageSelector,
  supportedLocales: supportedLocalesSelector
});
