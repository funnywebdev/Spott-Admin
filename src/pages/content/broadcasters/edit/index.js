import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TextInput from '../../../_common/inputs/textInput';
import { tabStyles, Root, FormSubtitle, colors, EditTemplate } from '../../../_common/styles';
import localized from '../../../_common/decorators/localized';
import * as actions from './actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Section from '../../../_common/components/section';
import { routerPushWithReturnTo } from '../../../../actions/global';
import Dropzone from '../../../_common/dropzone/imageDropzone';
import Label from '../../../_common/inputs/_label';
import selector from './selector';
import ensureEntityIsSaved from '../../../_common/decorators/ensureEntityIsSaved';
import { SideMenu } from '../../../app/sideMenu';
import Header from '../../../app/multiFunctionalHeader';

function validate (values, { t }) {
  const validationErrors = {};
  const { name } = values.toJS();
  if (!name) { validationErrors.name = t('common.errors.required'); }
  // Done
  return validationErrors;
}

@localized
@connect(selector, (dispatch) => ({
  deleteLogo: bindActionCreators(actions.deleteLogo, dispatch),
  load: bindActionCreators(actions.load, dispatch),
  submit: bindActionCreators(actions.submit, dispatch),
  uploadImage: bindActionCreators(actions.uploadImage, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@reduxForm({
  form: 'broadcasterEdit',
  validate
})
@ensureEntityIsSaved
@Radium
export default class EditBroadcaster extends Component {

  static propTypes = {
    currentBroadcaster: ImmutablePropTypes.map.isRequired,
    deleteLogo: PropTypes.func.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.submit = ::this.submit;
    this.redirect = ::this.redirect;
  }

  async componentWillMount () {
    const broadcasterId = this.props.params.broadcasterId;
    if (broadcasterId) {
      const { name } = await this.props.load(broadcasterId);
      this.props.initialize({ name });
    }
  }

  redirect () {
    this.props.routerPushWithReturnTo('/content/broadcasters', true);
  }

  async submit (form) {
    try {
      await this.props.submit({ ...form.toJS(), id: this.props.params.broadcasterId });
      this.props.initialize(form.toJS());
    } catch (error) {
      throw new SubmissionError({ _error: 'common.errors.unexpected' });
    }
  }

  static styles = {
    background: {
      backgroundColor: colors.lightGray4,
      paddingBottom: '50px'
    },
    paddingTop: {
      paddingTop: '1.25em'
    }
  }

  render () {
    const { currentBroadcaster, location, handleSubmit, deleteLogo } = this.props;
    const { styles } = this.constructor;
    return (
      <SideMenu>
        <Root style={styles.background}>
          <Header hierarchy={[
            { title: 'Broadcasters', url: '/content/broadcasters' },
            { title: currentBroadcaster.get('name'), url: location } ]}/>
          <EditTemplate onCancel={this.redirect} onSubmit={handleSubmit(this.submit)}>
            <Tabs>
              <TabList style={tabStyles.tabList}>
                <Tab style={tabStyles.tab}>Details</Tab>
              </TabList>
              <TabPanel>
                <Section first>
                  <FormSubtitle first>Content</FormSubtitle>
                  <Field
                    component={TextInput}
                    label='Name'
                    name='name'
                    placeholder='Name broadcaster'
                    required/>
                  <div style={styles.paddingTop}>
                    <Label text='Upload image' />
                    <Dropzone
                      accept='image/*'
                      downloadUrl={currentBroadcaster.get('logo') &&
                        currentBroadcaster.getIn([ 'logo', 'url' ])}
                      imageUrl={currentBroadcaster.get('logo') &&
                        `${currentBroadcaster.getIn([ 'logo', 'url' ])}?height=310&width=310`}
                      onChange={({ callback, file }) => this.props.uploadImage({ broadcasterId: this.props.params.broadcasterId, image: file, callback })}
                      onDelete={() => { deleteLogo({ broadcasterId: currentBroadcaster.get('id') }); }}/>
                  </div>
                </Section>
              </TabPanel>
            </Tabs>
          </EditTemplate>
        </Root>
      </SideMenu>
    );
  }

}
