
const typeDefs = `
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

  type Query {
    movies: [Movie]!
    movie(_id: ID!): Movie
    searchMovies( keyword: String!): [Movie]
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    addMovie(title: String!): Movie
    removeMovie(_id: ID!): Movie
  }
`;

module.exports = typeDefs;
