import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button, TextField, Alert } from '@mui/material';
import Auth from '../utils/auth';
import Modal from './Modal';

const StyledForm = styled('form')({
  
});

const StyledTextField = styled(TextField)({
 
});

const StyledButton = styled(Button)({
  
});

const SignupForm = ({ open, onClose }) => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      
      // const { data } = await addUser({
      //   variables: { ...userFormData },
      // });

      
      const data = { addUser: { token: 'dummyToken', user: { username: 'dummyUser' } } };

      const { token, user } = data.addUser;
      Auth.login(token);
      onClose(); 
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledForm noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant='filled'
          severity='error'
        >
          Something went wrong with your signup!
        </Alert>

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
          color='primary'
        >
          Submit
        </StyledButton>
      </StyledForm>
    </Modal>
  );
};

export default SignupForm;
