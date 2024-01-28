import React from 'react';
import Box from '@mui/material/Box';
import CompanyLogo from '../images/purpleturtle.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20px', 
        backgroundColor: '#f5f5f5',
        padding: '20px 0',
      }}
    >
      <img src={CompanyLogo} alt="Company Logo" style={{ height: '40px' }} />
    </Box>
  );
};

export default Footer;