const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  year: {
    type: String,
  },
  genre: [
    {
      type: String,
      trim: true,
    }
  ],
  href: {
    type: String,
  },
  extract: {
    type: String,
    trim: true,
  },
  cast: [
    {
      type: String,
      trim: true,
    }
  ],
  thumbnail: {
    type: String,
    trim: true,
  },
  thumbnail_width: {
    type: Number,
  },
  thumbnail_height: {
    type: Number,
  },
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
