import { gql } from '@apollo/client';


export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
      password
      favorite_movies
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      email
      password
      favorite_movies
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
      providers {
        logo_path
        provider_id
        provider_name
      }
    }
  }
`;

