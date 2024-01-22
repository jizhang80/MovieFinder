const { Movie, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');  //A.G Added

const resolvers = {
  Query:{

    users: async () => {
      return User.find().populate('movies'); //Added by A.G 
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('movies'); //Added by A.G to Populate movies of the user
    },

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

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },


    // addMovie: async (parent, { title }) => {
    //   return Movie.create({ title });
    // },

    addMovie: async (parent, { title }, context) => {
      if (context.user) {
        const movie = Movie.create({ title });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { movies: movie._id } }
        );

        return movie;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // removeMovie: async (parent, { movieId }) => {
    //   return Movie.findOneAndDelete({ _id: movieId });
    // },

    removeMovie: async (parent, { movieId }, context) => {
      if (context.user){
        const movie = Movie.findOneAndDelete({ _id: movieId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { movies: movie._id } }
        );
        return movie;
      }
      throw new AuthenticationError('You need to be logged in!');    
    },
  },
};

module.exports = resolvers;
