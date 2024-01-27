const { Movie, User, Provider } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');  //A.G Added
const searchMovies = require('../utils/searchMovies');
const isMovieLocal = require('../utils/isMovieLocal');
const getMovieDetailFromAPI = require('../utils/getMovieDetailFromAPI');
const saveMovie = require('../utils/saveMovie');
const getProvidersInfo = require('../utils/getProviderInfo');

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

    movie: async (parent, { id }) => {
      const idInt = Number(id);
      const isLocal = await isMovieLocal(id);
      let movie = {};
      if (isLocal) {
        console.log(`return movie ID: ${id} from local DB`)
        movie = await Movie.findOne({ id: idInt });
      } else {
        // get data from API, save the movie data to local DB
        const m = await getMovieDetailFromAPI(id);
        await saveMovie(m);
        console.log(`return movie ID: ${id} from API`)
        movie = await Movie.findOne({ id: idInt });
      }
      console.log(movie)
      const providers = await getProvidersInfo(movie.id);
      return {...movie._doc, providers};
      
    },

    searchMovies: async ( parent, { keyword }) => {
      const movies = await searchMovies(keyword);
      return movies;
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
