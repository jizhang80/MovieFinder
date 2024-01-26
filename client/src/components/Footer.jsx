import React from 'react';
import Box from '@mui/material/Box';
import CompanyLogo from '../images/purpleturtle.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80px',
        backgroundColor: '#f5f5f5',
        padding: '20px', // Add padding to create separation
        boxSizing: 'border-box', // Include padding in the total height
      }}
    >
      <img src={CompanyLogo} alt="Company Logo" style={{ height: '40px' }} />
    </Box>
  );
};

export default Footer;
