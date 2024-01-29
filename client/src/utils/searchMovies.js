// searchMovie from TMDB API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  }
};


export default async function searchMovie(keywords) {
	console.log(import.meta.env.VITE_TMDB_TOKEN)
	let movies = [];
	const url = `https://api.themoviedb.org/3/search/movie?query=${keywords}&include_adult=false&language=en-US&page=1&region=CA`;
	try {
		const response = await fetch(url, options);
		const searchResults = await response.json();
		
		if (!searchResults) return movies;
		for (let m of searchResults.results) {
			const idStr = m.id.toString();
			const movie = {
				...m,
				id: idStr
			}
			movies.push(movie);
		}

		// let total_pages = searchResults.total_pages;
		// if (searchResults.total_pages > 5) {
		// 	total_pages = 5; // cap search result to 5 page, 20 results per page, total 100 movies
		// }

		// if (searchResults.total_pages > 1) {
		// 	for (let page = 2; page <= total_pages; page++) {
		// 		const urlWithPage = `https://api.themoviedb.org/3/search/movie?query=${keywords}&include_adult=false&language=en-US&page=${page}&region=CA`;
		// 		const res = await fetch(urlWithPage, options);
		// 		const results = await res.json();
		// 		movies.push(...results.results);
		// 	}
		// }
		return movies;
	} catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  }
}


