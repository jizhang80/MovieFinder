// LoginForm.jsx
import React, { useState } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import Auth from '../utils/auth';
import Modal from './Modal';

const LoginForm = ({ open, onClose }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
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
     
      // const { data } = await loginUser({
      //   variables: { ...userFormData },
      // });

      
      const data = { login: { token: 'dummyToken', user: { username: 'dummyUser' } } };

      const loginUserData = data && data.login;

      if (loginUserData) {
        const { token, user } = loginUserData;
        Auth.login(token);
        onClose(); 
      } else {
        console.error('loginUser mutation response does not contain loginUser:', data);
        setShowAlert(true);
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: '', password: '' });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant='filled'
          severity='error'
        >
          Something went wrong with your login credentials!
        </Alert>

        <TextField
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

        <TextField
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

        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default LoginForm;
