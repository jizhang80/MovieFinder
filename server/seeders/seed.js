const db = require('../config/connection');
const { Movie } = require('../models');
const getPopMovies = require('./utils/getPopMovies');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Movie', 'movies');
    const movieSeeds = await getPopMovies();
    console.log('Total 100 movies are pulling from TMDB API, 40 movies per 10 seconds ...');
    await Movie.create(movieSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
