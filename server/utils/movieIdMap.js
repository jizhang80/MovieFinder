// make a movie id map structure globally available
const Movie = require('../models/Movie');
const movieIdMap = new Map(); // O(1)

async function initializeMovieIdMap() {
  try {
    const movies = await Movie.find({}, 'id'); // 'id' is the field representing movie ID
    movies.forEach((movie) => {
      movieIdMap.set(movie.id, true);
    });
    console.log('init movieIdMap...done');
  } catch (error) {
    console.error('Error initializing movieId map:', error);
  }
}

//update movieIdMap
async function updateMovieIdMap(movieId) {
  movieIdMap.set(movieId, true);
  console.log('update movieIdMap success')
}

module.exports = {
  movieIdMap,
  initializeMovieIdMap,
  updateMovieIdMap,
};