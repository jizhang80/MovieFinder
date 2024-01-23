// get movie detail from TMDB API by movieId
require('dotenv').config()
const fetch = require('node-fetch');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
  }
};

module.exports = async function getMovieDetailFromAPI(movieId) {
	const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
	try {
        const response = await fetch(url, options);
        //need response check here, later
        const movie = await response.json();
        return movie;
    } catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  	}
}