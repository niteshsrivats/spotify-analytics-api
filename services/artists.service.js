const Track = require('../models/Track.model');
const Artist = require('../models/Artist.model');

module.exports = {
  getArtistNames: () => Artist.aggregate([
    {$sort: {name: 1}},
    {$group: {_id: null, names: {$push: '$name'}}}
  ]),

  getArtist: (name) => Track.aggregate([
    {$match: {artists: {$in: [name]}}},
    {$sort: {year: 1}}
  ]),

  artistAverageStdDev: (fields) => {
    const stdGroup = {_id: {artist: "$artists"}};
    const avgGroup = {_id: null};

    fields.forEach((field) => {
      stdGroup[field] = {$stdDevSamp: '$' + field};
      avgGroup[field] = {$avg: '$' + field};
    });

    return Track.aggregate([
      {
        $unwind:
          {
            path: '$artists',
            preserveNullAndEmptyArrays: false
          }
      },
      {$group: stdGroup},
      {$group: avgGroup}
    ]);
  }
}
