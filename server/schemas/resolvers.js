const { Movie } = require('../models');

const resolvers = {
  Query:{
    movies: async () => {
      return Movie.find();
    },

    movie: async (parent, { movieId }) => {
      return Movie.findOne({ _id: movieId });
    },

    searchMovies: async ( parent, { keyword }) => {
      const regex = new RegExp(keyword, 'i'); // i for case-insensitive search
      console.log(regex)
      const movies = await Movie.find({ title: regex });
      return movies;
    },
  },
  
  Mutation: {
    addMovie: async (parent, { title }) => {
      return Movie.create({ title });
    },
    removeMovie: async (parent, { movieId }) => {
      return Movie.findOneAndDelete({ _id: movieId });
    },
  },
};

module.exports = resolvers;
