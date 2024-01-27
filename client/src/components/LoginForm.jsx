import React, { useState } from 'react';
import { Button, TextField, Alert, Typography, styled } from '@mui/material';

import Auth from '../utils/auth';
import Modal from './Modal';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const StyledForm = styled('form')({
  
});

const StyledTextField = styled(TextField)({
  
});

const StyledButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: 'black',
    opacity: '0.5',
  },
});

const StyledTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
});

const LoginForm = ({ open, onClose }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      const loginUserData = data && data.login;

      if (loginUserData) {
        const { token, user } = loginUserData;
        Auth.login(token);
        onClose();
        setShowSuccess(true); // Show success message
      } else {
        console.error('loginUser mutation response does not contain loginUser:', data);
        setShowAlert(true); // Show error message
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true); // Show error message
    }

    setUserFormData({ email: '', password: '' });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledForm noValidate validated={validated} onSubmit={handleFormSubmit}>
        <StyledTitle variant="h2">Login</StyledTitle>

        {showAlert && (
  <Alert
    dismissible="true"  
    onClose={() => setShowAlert(false)}
    variant='filled'
    severity='error'
  >
    Something went wrong with your login credentials!
  </Alert>
)}

        {error && (
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            variant='filled'
            severity='error'
          >
            {error.message}
          </Alert>
        )}

        {showSuccess && (
          <Alert
            severity="success"
            onClose={() => setShowSuccess(false)}
            sx={{ marginTop: '10px' }}
          >
            Logged in successfully!
          </Alert>
        )}

        <StyledTextField
          type='text'
          label='Email'
          name='email'
          variant='outlined'
          fullWidth
          margin='normal'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />

        <StyledTextField
          type='password'
          label='Password'
          name='password'
          variant='outlined'
          fullWidth
          margin='normal'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />

        <StyledButton
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
        >
          Submit
        </StyledButton>
      </StyledForm>
    </Modal>
  );
};

export default LoginForm;
