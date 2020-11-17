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

  tracksStatsByYear: (values) => {
    const group = {_id: {year: "$year"}};
    const project = {_id: 0, year: '$_id.year'};
    values.forEach((value) => {
      group[value + 'Avg'] = {$avg: '$' + value};
      project[value + 'Avg'] = 1;
    });

    return Track.aggregate([
      {$group: group},
      {$project: project},
      {$sort: {year: 1}},
    ]);
  }
}
