const db = require('../config/connection');
const { Movie, Provider } = require('../models');
const getPopMovies = require('./utils/getPopMovies');
const getProviders = require('./utils/getProvider');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Movie', 'movies');
    await cleanDB('User', 'users');
    await cleanDB('Provider', 'providers');
    console.log("DB cleaned");

    console.log('Total 100 movies are pulling from TMDB API, 40 movies per 10 seconds ...');
    const movieSeeds = await getPopMovies();
    await Movie.create(movieSeeds);
    const providers = await getProviders();
    await Provider.create(providers);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
