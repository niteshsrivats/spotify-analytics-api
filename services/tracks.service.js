const Track = require('../models/Track.model');

module.exports = {
  tracksDistForYear: (year, fields) => {
    const project = {_id: 0}
    const facets = {};

    fields.forEach((field) => {
      project[field.name] = {
        $let: {
          vars: {[field.name]: '$' + field.name},
          in: {
            $switch: {
              branches:
                field.range.map((num) => (
                  {
                    case: {$lte: ['$$' + field.name, num + field.step]},
                    then: num.toFixed(1) + ' - ' + (num + field.step).toFixed(1)
                  }))
            }
          }
        }
      };

      facets[field.name] = [
        {$group: {_id: {[field.name]: '$' + field.name}, count: {$sum: 1}}},
        {$project: {_id: 0, [field.name]: '$_id.' + field.name, count: 1}},
        {$sort: {[field.name]: 1}},
      ]
    })

    return Track.aggregate([
      {$match: {year: parseInt(year)}},
      {$project: project},
      {$facet: facets},
    ])
  },

  tracksStatsByYear: (fields) => {
    const group = {_id: {year: "$year"}};
    const project = {_id: 0, year: '$_id.year'};
    fields.forEach((field) => {
      group[field + 'Avg'] = {$avg: '$' + field};
      project[field + 'Avg'] = 1;
    });

    return Track.aggregate([
      {$group: group},
      {$project: project},
      {$sort: {year: 1}},
    ]);
  },

  getChartTracks: () => Track.find({}).sort({popularity: -1, year: -1}).limit(100)
}
