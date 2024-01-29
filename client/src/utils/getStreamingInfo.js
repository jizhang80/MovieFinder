// get Streaming info from TMDB API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2UzOGQ1YWRhYTk3ZmE3NjZhNTdhYjIxODU1MTlhYiIsInN1YiI6IjY1MDhmMzdkOGE4OGIyMDExZGIyZTU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0DTCFcXGEMNIaRBmzqu6Xt519jEtXPfXFURIRlK1N_g`
  }
};

export default async function getStreamingInfo(movieId) {
  let providers = [];
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;

  try {
    const response = await fetch(url, options);
    const searchResults = await response.json();
    
    if (!searchResults) return providers;

    providers.push(...searchResults.results.CA.flatrate);

    return providers;
  } catch (error) {
    console.error('Error fetching movie IDs:', error);
    // Handle the error as needed
  }
}