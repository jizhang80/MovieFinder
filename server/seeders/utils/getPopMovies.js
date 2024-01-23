require('dotenv').config()
/*
get pop 100 movies from TMDB API
call TMDB Polular API, 1 page per one call, 20 results per page, we need to call 5 pages, total 100 movies
url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=CA';
get all the results.id
then call TMDB movies details API to get all the 100 movies details, write it to local MongoDB

need the TMDB_TOKEN defined in .env
*/

const fetch = require('node-fetch');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
  }
};

module.exports = async function getPopMovies() {
  let movies = []; // final movies detail data
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  try {
    const movieIdsArray = await getPopMovieIds();
    let i = 0;
    for (let movieId of movieIdsArray) {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      try {
        const response = await fetch(url, options);
        // control the API call 40 times per second
        // Introduce a delay between requests (10 seconds / 40 requests = 250 milliseconds)
        await delay(250);

        const movieDetail = await response.json();
        movies.push(movieDetail);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Handle the error as needed
      }
    }
  } catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  }

  return movies;
}


async function getPopMovieIds() {
	let movieIds = [];
	for ( let page = 1; page <= 5 ; page++) {
		const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&region=CA`;

		await fetch(url, options)
		  .then(res => res.json())
		  .then(json => {
		  	for (let movie of json.results) {
		  		movieIds.push(movie.id);
		  	}
		  })
		  .catch(err => console.error('error:' + err));
	}
	return movieIds;
}
