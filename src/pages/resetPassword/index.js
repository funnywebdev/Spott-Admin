import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Radium from 'radium';
import { buttonStyles } from '../_common/styles';
import localized from '../_common/decorators/localized';
import Modal from '../_common/components/modal';
import { resetPassword } from '../../actions/user';
import { routerPushWithReturnTo } from '../../actions/global';

function validate (values) {
  const validationErrors = {};
  const passwordError = !values.get('password') || !values.get('password').match(/^.{6,}$/);
  if (passwordError) { validationErrors.password = 'invalid'; }
  const passwordRepeatError = !values.get('passwordRepeat') || !(values.get('passwordRepeat').match(/^.{6,}$/) && values.get('password') === values.get('passwordRepeat'));
  if (passwordRepeatError) { validationErrors.passwordRepeat = 'invalid'; }
  // Done
  return validationErrors;
}

const textBoxStyle = {
  textInput: {
    color: 'rgba(0, 0, 0, 0.502)',
    width: '100%',
    height: '46px',
    border: '1px solid rgb(187, 190, 193)',
    borderRadius: '4px',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Rubik-Regular',
    fontSize: '18px',
    marginBottom: 20
  },
  textInputError: {
    border: '1px #ff0000 solid'
  }
};

const renderField = Radium((props) => {
  return (
    <input
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      style={[ textBoxStyle.textInput, props.meta.touched && props.meta.error && textBoxStyle.textInputError, props.style ]}
      type={props.type}
      {...props.input} />
  );
});

@localized
// We get the reset password token from the query param in the url from the mail.
// We initialize the form with the reset password token.
@connect((state, { location: { query: { token } } }) => ({
  initialValues: {
    token
  }
}), (dispatch) => ({
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  submit: bindActionCreators(resetPassword, dispatch)
}))
@reduxForm({
  form: 'resetPassword',
  validate
})
@Radium
export default class ResetPasswordModal extends Component {

  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseClick = ::this.onCloseClick;
    this.submit = ::this.submit;
    // Show message that password has been changed.
    this.state = { success: false };
  }

  // The autofocus attribute will only work when the page loads initially.
  // When a popup opens we still need to manually focus the field.
  componentDidMount () {
    setTimeout(() => {
      ReactDOM.findDOMNode(this._password).focus();
    }, 0);
  }

  /* eslint-disable react/no-set-state */
  async submit (form) {
    try {
      await this.props.submit(form.toJS());
      this.setState({ success: true });
    } catch (error) {
      throw new SubmissionError({ _error: 'resetPassword.errors.failed' });
    }
  }

  onCloseClick (e) {
    this.props.routerPushWithReturnTo('/', true);
  }

  static styles = {
    error: {
      color: '#ff0000',
      fontSize: '1em',
      marginBottom: '1em'
    },
    container: {
      position: 'relative'
    },
    content: {
      padding: '20px 34px 20px 34px'
    },
    button: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 18,
      paddingRight: 18,
      textTransform: 'uppercase',
      width: 'auto',
      float: 'right'
    },
    success: {
      color: '#ffffff',
      marginBottom: '1em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { error, handleSubmit, t } = this.props;
    const { success } = this.state;

    return (
      <Modal isOpen onClose={this.onCloseClick}>
        <div style={styles.container}>
          {success
            ? <div style={styles.content}>
                <p style={styles.success}>{t('resetPassword.success')}</p>
                <button style={[ buttonStyles.base, buttonStyles.small, buttonStyles.pink, styles.button ]} onClick={this.onCloseClick}>{t('common.ok')}</button>
              </div>
            : <form style={styles.content} onSubmit={handleSubmit(this.submit)}>
                <Field component={renderField} name='password' placeholder={t('resetPassword.password')} ref={(c) => { this._password = c; }} type='password' />
                <Field component={renderField} name='passwordRepeat' placeholder={t('resetPassword.passwordRepeat')} type='password' />

                {error && typeof error === 'string' && <p style={styles.error}>{t(error)}</p>}

                <button style={[ buttonStyles.base, buttonStyles.small, buttonStyles.pink, styles.button ]} type='submit'>{t('resetPassword.submitButton')}</button>
              </form>}
        </div>
      </Modal>
    );
  }

}
