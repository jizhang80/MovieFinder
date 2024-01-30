const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  imdb_id: {
    type: String,
  },
  release_date: {
    type: String,
  },
  title: {
    type: String,
  },
  genres: [{
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
  }],
  original_language: {
    type: String,
  },
  homepage: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
