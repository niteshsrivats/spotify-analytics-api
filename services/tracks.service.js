const Track = require('../models/Track.model');

module.exports = {
  tracksDistByYear: (value, range, step) =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          [value]: {
            $let: {
              vars: {
                [value]: '$' + value
              },
              in: {
                $switch: {
                  branches:
                    range.map((num) => (
                      {case: {$lte: ['$$' + value, parseFloat(num)]}, then: (num - step).toFixed(2) + ' - ' + num}))
                }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: {
            year: "$year",
            [value]: '$' + value,
          },
          count: {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          [value]: '$_id.' + value,
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          [value]: 1,
        }
      },
    ]),
  tracksStatsByYear: (values) => {
    const group = {_id: {year: "$year"}};
    const project = {_id: 0, year: '$_id.year'};
    values.forEach((value) => {
      group[value + 'Avg'] = {$avg: '$' + value};
      group[value + 'StdDevSamp'] = {$stdDevSamp: '$' + value};
      project[value + 'Avg'] = 1;
      project[value + 'StdDevSamp'] = 1;
    });

    return Track.aggregate([
      {
        $group: group
      },
      {
        $project: project
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]);
  }
}
