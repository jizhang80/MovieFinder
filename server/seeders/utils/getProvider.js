//get CA movie streaming provider brands logo/info from TMDB API
// it's a one time info
require('dotenv').config()
const fetch = require('node-fetch');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
  }
};

module.exports = async function getProviders() {
	let providers = [];
	const url = `https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=CA`;
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		for (let provider of data.results) {
			providers.push(provider);
		}
	} catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  	}

	return providers;
}
	