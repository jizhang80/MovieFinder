import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button, TextField, Alert, Typography } from '@mui/material';
import Auth from '../utils/auth';
import Modal from './Modal';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const StyledForm = styled('form')({
  // Your styling here
});

const StyledTextField = styled(TextField)({
  // Your styling here
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

const SignupForm = ({ open, onClose }) => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Use the useMutation hook to execute the ADD_USER mutation
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...userFormData },
      });
  
      const { token, user } = data.addUser;
      Auth.login(token);
      onClose();
      setShowSuccess(true); // Show success message
    } catch (err) {
      console.error(err);
  
      const graphQLErrors = err.graphQLErrors || [];
      console.log('GraphQL errors:', graphQLErrors); // Log the entire error object
  
      const errorMessages = graphQLErrors.map(error => error.message);
  
      if (errorMessages.includes('User with the provided email already exists.')) {
        setShowAlert('User with the same email already exists.');
      } else if (errorMessages.some(message => message.toLowerCase().includes('password'))) {
        setShowAlert('Password must be at least 6 characters long.');
      } else {
        setShowAlert('Something went wrong with your signup!');
      }
    }
  
    setUserFormData({ username: '', email: '', password: '' });
  };
  
  
  return (
    <Modal open={open} onClose={onClose}>
      <StyledForm noValidate validated={validated} onSubmit={handleFormSubmit}>
        <StyledTitle variant="h2">Create Account</StyledTitle>

        {showAlert && (
          <Alert
            dismissible="true"
            onClose={() => setShowAlert(false)}
            variant='filled'
            severity='error'
          >
            {showAlert}
          </Alert>
        )}

        <StyledTextField
          type='text'
          label='Username'
          name='username'
          variant='outlined'
          fullWidth
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />

        <StyledTextField
          type='email'
          label='Email'
          name='email'
          variant='outlined'
          fullWidth
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
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />

        <StyledButton
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
        >
          Submit
        </StyledButton>

        {showSuccess && (
          <Alert
            severity="success"
            onClose={() => setShowSuccess(false)}
            sx={{ marginTop: '10px' }}
          >
            User created successfully! You can now log in with your credentials.
          </Alert>
        )}
      </StyledForm>
    </Modal>
  );
};

export default SignupForm;
