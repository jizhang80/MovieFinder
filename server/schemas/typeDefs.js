
const typeDefs = `

type Genres {
    _id: ID!
    id: Int
    name: String
  }

type User {
  _id: ID
  username: String
  email: String
  password: String
  movies: [Movie]!
}

  type Movie {
    _id: ID!
    id: Int!
    imdb_id: String!
    release_date: String
    title: String
    genres: [Genres]
    original_language: String
    homepage: String
    overview: String
    popularity: Int
    poster_path: String
    vote_average: Float
    vote_count: Int
  }

  input MovieData {
    id: Int!
    imdb_id: String!
    release_date: String
    title: String
    genres: [Genres]
    original_language: String
    homepage: String
    overview: String
    popularity: Int
    poster_path: String
    vote_average: Float
    vote_count: Int
  }

  type movieResponse {
    success: Boolean
    movie: Movie
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String): User 
    movies: [Movie]!
    movie(_id: ID!): Movie
    searchMovies( keyword: String!): [Movie]
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMovie(title: String!): Movie
    removeMovie(_id: ID!): Movie
  }
`;

module.exports = typeDefs;
