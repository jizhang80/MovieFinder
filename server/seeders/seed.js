const db = require('../config/connection');
const { Movie } = require('../models');
const getPopMovies = require('./utils/getPopMovies');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Movie', 'movies');

    console.log('Total 100 movies are pulling from TMDB API, 40 movies per 10 seconds ...');
    const movieSeeds = await getPopMovies();
    
    await Movie.create(movieSeeds);
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
