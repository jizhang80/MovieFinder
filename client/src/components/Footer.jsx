import React from 'react';
import Box from '@mui/material/Box';

import CompanyLogo from '../images/purpleturtle.png';

const Footer = () => {
  return (
    <Box
<<<<<<< Updated upstream
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80px', 
        backgroundColor: '#f5f5f5', 
      }}
    >
      <img src={CompanyLogo} alt="Company Logo" style={{ height: '50px' }} />
    </Box>
  );
};
=======
    component="footer"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80px', 
      backgroundColor: '#f5f5f5', 
      border: '2px solid red', 
    }}
  >
    <img src={CompanyLogo} alt="Company Logo" style={{ height: '50px' }} />
  </Box>
)};
>>>>>>> Stashed changes

export default Footer;