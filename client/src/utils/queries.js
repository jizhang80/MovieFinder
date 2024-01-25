import { gql } from '@apollo/client';

// search movie
export const QUERY_SEARCHMOVIE = gql`
  query getSearchResult($keyword: String!) {
    searchMovies (keyword: $keyword) {
      id
      imdb_id
      title
      genres
      homepage
      overview
      poster_path
      vote_average
    }
  }
`;

// query movie detail
export const QUERY_MOVIEDETAIL = gql`
  query getMovieDetail($movieId: String!) {
    movie(id: $movieId) {
      id
      imdb_id
      title
      genres {
        id
        name
      }
      homepage
      overview
      poster_path
      vote_average
    }
  }
`;