//save movie to local DB, update movieIdMap
const { Movie } = require('../models');
const { updateMovieIdMap } = require('./movieIdMap');

module.exports = async function saveMovie(movieObj) {
	try {
		await Movie.create(movieObj);
		await updateMovieIdMap(movieObj.id);
		console.log(`add movie ${movieObj.id} to DB`);
	} catch (err) {
		throw err;
	}
}