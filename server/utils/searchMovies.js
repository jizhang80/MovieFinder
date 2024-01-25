// searchMovie from TMDB API

require('dotenv').config()
const fetch = require('node-fetch');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
  }
};

module.exports = async function searchMovie(keywords) {
	let movies = [];
	const url = `https://api.themoviedb.org/3/search/movie?query=${keywords}&include_adult=false&language=en-US&page=1&region=CA`;
	try {
		const response = await fetch(url, options);
		const searchResults = await response.json();
		
		if (!searchResults) return movies;

		movies.push(...searchResults.results);

		if (searchResults.total_pages > 1) {
			for (let page = 2; page <= searchResults.total_pages; page++) {
				const urlWithPage = `https://api.themoviedb.org/3/search/movie?query=${keywords}&include_adult=false&language=en-US&page=${page}&region=CA`;
				const res = await fetch(urlWithPage, options);
				const results = await response.json();
				movies.push(...searchResults.results);
			}
		}

		return movies;
	} catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  }
};


