import { gql } from '@apollo/client';


export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($profileId: ID!) {
    profile(userId: $userId) {
      _id
      name
     
    }
  }
`;

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

