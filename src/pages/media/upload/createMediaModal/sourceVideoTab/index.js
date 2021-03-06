import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import Dropzone from '../../../../_common/dropzone/old';
import { reduxForm, Field } from 'redux-form/immutable';
import { buttonStyles } from '../../../../_common/styles';
import createMediaStyles from '../styles';

function validate (values) {
  const errors = {};
  const { video } = values.toJS();
  // Validate video
  if (!(video instanceof File)) {
    errors.video = 'Please select a video.';
  } else if (video.size === 0) {
    errors.video = 'The file is empty.';
  } else if (video.size === 100 * 1024 * 1024 * 1024) { // 100 GB
    errors.video = 'The file is too large. Maximum size: 100GB.';
  } else if (![ 'mov', 'mp4', 'avi', 'mxf' ].some((ext) => video.name.toLowerCase().endsWith(ext))) {
    errors.video = 'Invalid or unsupported video file. Valid extensions are: MOV, MP4, AVI and MXF.';
  }
  // Done; return
  return errors;
}
/*
lastModified: 1455997469000
lastModifiedDate: Sat Feb 20 2016 20:44:29 GMT+0100 (CET)
name: "Principles of Corporate Finance (10th Edition).pdf"
size: 13280812
type: "application/pdf"
webkitRelativePath: ""
*/

@reduxForm({
  destroyOnUnmount: false,
  form: 'createMedia',
  validate
})
@Radium
export default class SourceVideoTab extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onBack = ::this.onBack;
  }

  onBack (e) {
    e.preventDefault();
    this.props.onBack();
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <form noValidate onSubmit={handleSubmit}>
        <div style={createMediaStyles.body}>
          <h1 style={createMediaStyles.title}>Upload the source video</h1>

          {/* Render dropzone that enables file selection */}
          <Field
            component={Dropzone}
            message={<span>Drag & drop the source video <br/>We accept .MOV, MP4, .AVI and .MXF</span>}
            name='video' />

          {/* TODO: Design shows a checkbox "This is the final version" */}
        </div>

        <div style={createMediaStyles.footer.container}>
          <button key='back' style={[ buttonStyles.base, buttonStyles.small, buttonStyles.gray, buttonStyles.first ]} onClick={this.onBack}>BACK</button>
          <button key='next' style={[ buttonStyles.base, buttonStyles.small, buttonStyles.blue ]} type='submit'>NEXT</button>
        </div>
      </form>
    );
  }
}
