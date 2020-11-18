let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    index: true,
    unique: true,
  },
}, {versionKey: false});

module.exports = mongoose.model('Artist', ArtistSchema);
