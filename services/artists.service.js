const Track = require('../models/Track.model');
const Artist = require('../models/Artist.model');

module.exports = {
  getArtistNames: () => Artist.aggregate([
    { $sort: { name: 1 } },
    { $group: { _id: null, names: { $push: '$name' } } }
  ]),

  getArtist: (name) => Track.aggregate([
    { $match: { artists: { $in: [name] } } },
    { $sort: { year: 1 } }
  ]),

  artistAverageStdDev: (fields) => {
    const stdGroup = { _id: { artist: '$artists' } };
    const avgGroup = { _id: null };

    fields.forEach((field) => {
      stdGroup[field] = { $stdDevSamp: '$' + field };
      avgGroup[field] = { $avg: '$' + field };
    });

    console.log(JSON.stringify({
      aggregate: [
        {
          $unwind:
            {
              path: '$artists',
              preserveNullAndEmptyArrays: false
            }
        },
        { $group: stdGroup },
        { $group: avgGroup }
      ]
    }));

    return Track.aggregate([
      {
        $unwind:
          {
            path: '$artists',
            preserveNullAndEmptyArrays: false
          }
      },
      { $group: stdGroup },
      { $group: avgGroup }
    ]);
  },

  addNewArtists: async (artists) => {
    const names = await Artist.find({ name: { $in: [artists] } });
    for (let i = 0; i < artists.length; i++) {
      const name = artists[i].name;
      if (!names.includes(name)) {
        const artist = new Artist({ name });
        await artist.save();
      }
    }
  },

  deleteEmptyArtists: async (artists) => {
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      const result = await Track.find({ artists: { $in: [artist] } }).limit(1);
      if (result.length === 0) {
        Artist.remove({ name: artist });
      }
    }
  }
};
