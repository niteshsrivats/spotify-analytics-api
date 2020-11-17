let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const TrackSchema = new Schema({
  acousticness: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  artists: {
    type: Array,
    required: true,
  },
  danceability: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  duration_ms: {
    type: Number,
    required: true,
  },
  energy: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  instrumentalness: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  key: {
    type: Number,
    max: 11,
    min: 0,
    required: true,
  },
  liveness: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  loudness: {
    type: Number,
    max: 4,
    min: -60,
    required: true,
  },
  name: {
    type: String,
    required: true,
    max: 255
  },
  popularity: {
    type: Number,
    max: 100,
    min: 0,
    required: true,
  },
  speechiness: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  tempo: {
    type: Number,
    max: 240,
    min: 0,
    required: true,
  },
  valence: {
    type: Number,
    max: 1,
    min: 0,
    required: true,
  },
  year: {
    type: Number,
    max: new Date().getFullYear(),
    min: 1930,
    required: true,
    validate: {
      validator: (v) => Number(v) <= new Date().getFullYear(),
      message: props => `${props.value} is not a valid year`
    },
    index: true,
  },
}, {versionKey: false});

module.exports = mongoose.model('Track', TrackSchema);