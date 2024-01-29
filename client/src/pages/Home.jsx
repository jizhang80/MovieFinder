import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomePhoto from '../images/homephoto.jpg';
import CompanyLogo from '../images/purpleturtle.png';
import SearchForm from '../components/SearchForm';

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
            Welcome to Purple Turtle, where we value your time! Say goodbye to the hassle of searching for movies across multiple platforms. With our streamlined service, you can effortlessly discover where your desired movies are available for streaming, all in one place.

We offer a diverse collection of movies, and our primary goal is to simplify your viewing experience. Instead of sifting through various streaming services, you can now search for movies by title and instantly find out where they are currently streaming. No more guessing or scrolling through endless lists.

Additionally, you have the convenience of adding movies directly to your watchlist, creating a personalized library for your future viewing pleasures. It's time to enhance your movie-watching journey—sign up with Purple Turtle today and dive into seamless, efficient streaming!
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
          <SearchForm />
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

