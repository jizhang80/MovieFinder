// get Streaming info from TMDB API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
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