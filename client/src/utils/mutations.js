
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_FAV_MOVIE = gql`
  mutation addFavMovie($movieId: String!) {
    addFavMovie(id: $movieId) {
        _id
        username
        email
        favorite_movies {
          _id
          id
          title
        }
    }
  }
`;

export const REMOVE_FAV_MOVIE = gql`
  mutation removeFavMovie($movieId: String!) {
    removeFavMovie(id: $movieId) {
        _id
        username
        email
        favorite_movies {
          _id
          id
          title
        }
    }
  }
`;