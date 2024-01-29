module.exports = function convertMovieIdToStr(movie) {
	const movieIdStr = movie.id.toString();
	const movieConverted = {
		...movie,
		id: movieIdStr,
	};
	return movieConverted;
}