const { Movie, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const searchMovies = require('../utils/searchMovies');
const isMovieLocal = require('../utils/isMovieLocal');
const getMovieDetailFromAPI = require('../utils/getMovieDetailFromAPI');
const saveMovie = require('../utils/saveMovie');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('movies');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('movies');
    },
    movies: async () => {
      return Movie.find();
    },
    movie: async (parent, { id }) => {
      const idInt = Number(id);
      const isLocal = await isMovieLocal(id);

      if (isLocal) {
        console.log(`return movie ID: ${id} from local DB`);
        return Movie.findOne({ id: idInt });
      } else {
        const movie = await getMovieDetailFromAPI(id);
        await saveMovie(movie);
        console.log(`return movie ID: ${id} from API`);
        return Movie.findOne({ id: idInt });
      }
    },
    searchMovies: async (parent, { keyword }) => {
      const movies = await searchMovies(keyword);
      return movies;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error('User with the provided email already exists.');
        }

        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error('Error in addUser mutation:', error);
        throw error;
      }
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
          { $addToSet: { favorite_movies: movie._id } }
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
          { $pull: { favorite_movies: movie._id } }
        );
        return movie;
      }
      throw new AuthenticationError('You need to be logged in!');    
    },

    editMovie: async (parent, { movieId }, context) => {
      if (context.user){
        const user = User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorite_movies: movieId } }
         
        );
           
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');    
    },
  },
};

module.exports = resolvers;
