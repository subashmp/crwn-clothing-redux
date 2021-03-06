import React from 'react';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import SignInForm from '../signin-form/SignInForm.component';
import RegisterForm from '../register-form/RegisterForm.component';
import AuthModalHeader from '../../AuthModalHeader/AuthModalHeader.component';

import { selectCurrentForm } from '../../../redux/selectors/auth.selectors';
import { toggleAuthModalHidden } from '../../../redux/reducers/auth.reducer';
import {
  selectCurrentUser,
  selectLoading
} from '../../../redux/selectors/user.selectors';

import './FormModal.styles.scss';

/****************************
 * content for ModalWithHeader
 * content = { signin: SignInForm, register: RegisterForm }
 */
const mapDispatchToProps = dispatch => ({
  toggleAuthModalHidden: () => dispatch(toggleAuthModalHidden())
});

const mapStateToProps = createStructuredSelector({
  currentForm: selectCurrentForm,
  currentUser: selectCurrentUser,
  loading: selectLoading
});

const ModalWithHeader = (ModalHeader, content) => ({
  toggleAuthModalHidden,
  currentForm,
  currentUser,
  loading
}) => {
  const Form = content[currentForm];
  if (currentUser) toggleAuthModalHidden();
  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={() => toggleAuthModalHidden()}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div
          style={loading ? { visibility: 'hidden' } : {}}
          className="modal-header"
        >
          <ModalHeader />
        </div>
        {<Form />}
      </div>
    </div>,
    document.querySelector('#reactPortal')
  );
};

const FormModal = ModalWithHeader(AuthModalHeader, {
  signin: SignInForm,
  register: RegisterForm
});

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
