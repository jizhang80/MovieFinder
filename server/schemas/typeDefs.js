
const typeDefs = `

type User {
  _id: ID
  username: String
  email: String
  password: String
  movies: [Movie]!
}
  type Movie {
    _id: ID!
    title: String!
    year: String
    genre: [String]
    href: String
    extract: String
    cast: [String]
    thumbnail: String
    thumbnail_width: Int
    thumbnail_height: Int
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
