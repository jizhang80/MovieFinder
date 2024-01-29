import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

import CompanyLogo from '../images/purpleturtle.png';

const ButtonAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [signupFormOpen, setSignupFormOpen] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    const isLoggedIn = Auth.loggedIn();
    setLoggedIn(isLoggedIn);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleDrawerItemClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const openLoginForm = () => {
    setLoginFormOpen(true);
    setSignupFormOpen(false);
  };

  const closeLoginForm = () => {
    setLoginFormOpen(false);
  };

  const openSignupForm = () => {
    setSignupFormOpen(true);
    setLoginFormOpen(false);
  };

  const closeSignupForm = () => {
    setSignupFormOpen(false);
  };

  const handleLogout = () => {
    Auth.logout();
    setLoggedIn(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <img src={CompanyLogo} alt="Company Logo" style={{ height: 50, marginRight: 10 }} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={openLoginForm}>
                Login
              </Button>
              <Button color="inherit" onClick={openSignupForm}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={() => handleDrawerItemClick('/')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick('/saved')}>
            <ListItemText primary="WatchList" />
          </ListItem>
        </List>
      </Drawer>

      <LoginForm open={loginFormOpen} onClose={closeLoginForm} />
      <SignupForm open={signupFormOpen} onClose={closeSignupForm} />

      {/* Backdrop overlay */}
      {(loginFormOpen || signupFormOpen) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 999,
          }}
        />
      )}
    </Box>
  );
};

export default ButtonAppBar;
