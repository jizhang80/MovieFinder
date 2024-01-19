const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  ImdbId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  poster_url: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
  },
  certificate: {
    type: String,
  },
  runtime: {
    type: String,
  },
  genre: [
    {
      type: String,
      trim: true,
    }
  ],
  ratingValue: {
    type: String,
  },
  summary_text: {
    type: String,
    trim: true,
  },
  ratingCount: {
    type: String,
  },
  director: {
    name: {
      type: String,
      trim: true,
    },
    name_id : {
      type: String,
    },
  },
  cast: [
    {
      name: {
        type: String,
        trim: true,
      },
      name_id : {
        type: String,
      },
    }
  ],
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
