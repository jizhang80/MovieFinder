import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomePhoto from '../images/homephoto.jpg';

const Home = () => {
  return (
    <Container sx={{ marginTop: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left Content */}
        <Box sx={{ flex: '1', marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Home Page
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Work in progress, come back later dudes.
          </Typography>

          {/* Search Bar Section */}
          <Box mt={2} sx={{ width: '100%', textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom>
              Search for Movies
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: 'black',
                color: 'white',
                opacity: '0.8',
                transition: 'opacity 0.3s',
              }}
              sx={{
                '&:hover': {
                  opacity: '1',
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Right Image Section */}
        <Box sx={{ flex: '1', width: '50%' }}>
  <img src={HomePhoto} alt="Cute Photo" style={{ width: '100%', height: '80%', objectFit: 'cover' }} />
</Box>
      </Box>
    </Container>
  );
};

export default Home;




