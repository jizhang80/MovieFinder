// check if movie in local DB
const { movieIdMap } = require('./movieIdMap');

module.exports = async function isMovieLocal(movieId) {
	const result = await movieIdMap.has(movieId);
	return result;
}