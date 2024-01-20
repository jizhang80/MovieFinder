import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: '400px',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

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
    <>
      <form className={classes.form} noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='filled' severity='error'>
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
          className={classes.submitButton}
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
          color='primary'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
