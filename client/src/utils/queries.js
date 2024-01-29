import { gql } from '@apollo/client';

const MovieFragment = gql`
  fragment MovieDetails on Movie {
    _id
    id
    imdb_id
    title
    genres {
      _id
      id
      name
    }
    homepage
    overview
    poster_path
    vote_average
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
      password
      favorite_movies {
        ...MovieDetails
      }
    }
  }
  ${MovieFragment}
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: String!) {
    user(userId: $userId) {
      _id
      username
      email
      password
      favorite_movies
    }
  }
`;

export const QUERY_FAV_MOVIES = gql`
  query favMovies {
    favMovies
  }
`;

export const QUERY_FAV_MOVIES_DETAIL = gql`
  query favMoviesDetail {
    favMoviesDetail {
      ...MovieDetails
    }
  }
  ${MovieFragment}
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

