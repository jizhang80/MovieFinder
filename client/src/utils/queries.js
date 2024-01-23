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
