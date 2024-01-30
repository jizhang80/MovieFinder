// searchMovie from TMDB API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2UzOGQ1YWRhYTk3ZmE3NjZhNTdhYjIxODU1MTlhYiIsInN1YiI6IjY1MDhmMzdkOGE4OGIyMDExZGIyZTU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0DTCFcXGEMNIaRBmzqu6Xt519jEtXPfXFURIRlK1N_g`
  }
};


export default async function searchMovie(keywords) {
	let movies = [];
	const url = `https://api.themoviedb.org/3/search/movie?query=${keywords}&include_adult=false&language=en-US&page=1&region=CA`;
	try {
		const response = await fetch(url, options);
		const searchResults = await response.json();
		if (response.ok){
			for (let m of searchResults.results) {
				const idStr = m.id.toString();
				const movie = {
					...m,
					__typename: "Movie",
					id: idStr
				}
				movies.push(movie);
			}
		} else {
			console.log("fetch error: ",response);
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


