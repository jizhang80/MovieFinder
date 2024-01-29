
const { Movie, User, Provider } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');  //A.G Added
const isMovieLocal = require('../utils/isMovieLocal');
const getMovieDetailFromAPI = require('../utils/getMovieDetailFromAPI');
const saveMovie = require('../utils/saveMovie');
const getProvidersInfo = require('../utils/getProviderInfo');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      const userData = await User.findById(userId);
      return userData;
    },
    movies: async () => {
      return Movie.find();
    },
    movie: async (parent, { id }) => {
      const isLocal = await isMovieLocal(id);

      let movie = {};
      if (isLocal) {
        console.log(`return movie ID: ${id} from local DB`)
        movie = await Movie.findOne({ id: id });
      } else {
        // get data from API, save the movie data to local DB
        const m = await getMovieDetailFromAPI(id);
        await saveMovie(m);
        console.log(`return movie ID: ${id} from API`)
        movie = await Movie.findOne({ id: id });
      }

      const providers = await getProvidersInfo(movie.id);
      return {...movie._doc, providers};
    },
    favMovies: async (parent, _, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user.favorite_movies
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },

    favMoviesDetail: async (parent, _, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        let movies = [];
        for (let movieId of user.favorite_movies) {
          const movie = await Movie.findOne({id: movieId});
          movies.push(movie);
        }
        return movies;
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },

    providers: async () => {
      return Provider.find();
    },

    provider: async (parent, {providerId}) => {
      return Provider.findOne({provider_id: providerId});
    }
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

    addFavMovie: async (parent, { id }, context) => {
      // add movie obj to user favorite_movies
      // first check if movie data in local DB or need get from API
      if (context.user) {
        const isLocal = await isMovieLocal(id);
        let movie = {};
        if (isLocal) {
          console.log(`return movie ID: ${id} from local DB`)
        } else {
          // get data from API, save the movie data to local DB
          const m = await getMovieDetailFromAPI(id);
          const isLocal = await isMovieLocal(id);
          if (!isLocal) {
            await saveMovie(m);
          }
          console.log(`return movie ID: ${id} from API`)
        }

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorite_movies: id } },
          { new: true }
        );

        return {
          sucess: true, 
          message: "sucess add movie to fav",
          user: user,
          movieId: id}

      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },

    removeFavMovie: async (parent, { id }, context) => {
      if (context.user){
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorite_movies: id  } },
          { new: true}
        );

        return {
          sucess: true, 
          message: "sucess add movie to fav",
          user: updateUser,
          movieId: id} 
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },
  },
};

module.exports = resolvers;
