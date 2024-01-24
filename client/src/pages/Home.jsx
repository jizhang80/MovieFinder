import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomePhoto from '../images/homephoto.jpg';
import CompanyLogo from '../images/purpleturtle.png';

const Home = () => {
  return (
    <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', // Allow items to wrap to the next line
        }}
      >
        {/* Left Content */}
        <Box
          sx={{
            flex: '1',
            marginRight: '20px',
            minWidth: '300px',
            width: { xs: '100%', sm: '50%' }, // Full width on mobile, 50% width on small screens and above
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to...
          </Typography>
          <br />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <img src={CompanyLogo} alt="Company Logo" style={{ width: '60%', marginBottom: '10px' }} />
            <br />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Here at purple turtle we understand time is of the essence. Why waste time searching for movies to watch when you can have them all in one place? We have a wide variety of movies to choose from. You can search for movies by title, genre, or even by actor. You can also add movies to your watchlist to save them for later. So what are you waiting for? Sign up today and start watching!
            </Typography>
          </Box>

          {/* Right Image Section (Only on small screens) */}
          <Box
            sx={{
              display: { xs: 'block', sm: 'none' }, // Show on small screens, hide on screens wider than 600px
              width: '100%',
              marginTop: '20px', // Add top margin on mobile
            }}
          >
            <img src={HomePhoto} alt="Cute Photo" style={{ width: '100%', height: '80%', objectFit: 'cover' }} />
          </Box>

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

        {/* Right Image Section (Hide on small screens) */}
        <Box
          sx={{
            flex: '1',
            width: { xs: '100%', sm: '50%' }, // Full width on mobile, 50% width on small screens and above
            display: { xs: 'none', sm: 'block' }, // Hide on small screens, show on screens wider than 600px
          }}
        >
          <img src={HomePhoto} alt="Cute Photo" style={{ width: '100%', height: '80%', objectFit: 'cover' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;

