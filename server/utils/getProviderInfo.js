// get Streaming providers info from TMDB API
require('dotenv').config()
const fetch = require('node-fetch');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
  }
};

module.exports = async function getProvidersInfo(movieId) {
  let providers = [];
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;

  try {
    const response = await fetch(url, options);
    const searchResults = await response.json();
    
    if (!response.ok) return providers;

    providers.push(...searchResults.results.CA.flatrate);

    return providers;
  } catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  }
}