const db = require('../config/connection');
const { Movie } = require('../models');
const movieSeeds = require('./movieSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Movie', 'movies');
    
    await Movie.create(movieSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
