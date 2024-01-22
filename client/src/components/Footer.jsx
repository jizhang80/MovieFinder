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
        height: '80px', // Set the desired height
        backgroundColor: '#f5f5f5', // Set the desired background color
      }}
    >
      <img src={CompanyLogo} alt="Company Logo" style={{ height: '50px' }} />
    </Box>
  );
};

export default Footer;