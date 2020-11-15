const Track = require('../models/Track.model');

module.exports = {
  tracksAcousticnessDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          acousticness: {
            $let: {
              "vars": {
                "acousticness": "$acousticness"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$acousticness", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$acousticness", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$acousticness", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$acousticness", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$acousticness", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$acousticness", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$acousticness", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$acousticness", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$acousticness", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$acousticness", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$acousticness", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$acousticness", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$acousticness", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$acousticness", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$acousticness", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$acousticness", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$acousticness", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$acousticness", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$acousticness", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$acousticness", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "acousticness": "$acousticness",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          acousticness: '$_id.acousticness',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          acousticness: 1,
        }
      },
    ]),
  tracksAcousticnessStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "acousticnessAvg": {$avg: '$acousticness'},
          "acousticnessStdDevSamp": {$stdDevSamp: '$acousticness'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          acousticnessAvg: 1,
          acousticnessStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksDanceabilityDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          danceability: {
            $let: {
              "vars": {
                "danceability": "$danceability"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$danceability", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$danceability", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$danceability", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$danceability", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$danceability", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$danceability", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$danceability", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$danceability", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$danceability", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$danceability", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$danceability", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$danceability", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$danceability", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$danceability", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$danceability", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$danceability", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$danceability", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$danceability", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$danceability", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$danceability", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "danceability": "$danceability",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          danceability: '$_id.danceability',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          danceability: 1,
        }
      },
    ]),
  tracksDanceabilityStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "danceabilityAvg": {$avg: '$danceability'},
          "danceabilityStdDevSamp": {$stdDevSamp: '$danceability'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          danceabilityAvg: 1,
          danceabilityStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksEnergyDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          energy: {
            $let: {
              "vars": {
                "energy": "$energy"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$energy", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$energy", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$energy", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$energy", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$energy", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$energy", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$energy", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$energy", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$energy", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$energy", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$energy", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$energy", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$energy", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$energy", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$energy", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$energy", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$energy", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$energy", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$energy", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$energy", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "energy": "$energy",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          energy: '$_id.energy',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          energy: 1,
        }
      },
    ]),
  tracksEnergyStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "energyAvg": {$avg: '$energy'},
          "energyStdDevSamp": {$stdDevSamp: '$energy'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          energyAvg: 1,
          energyStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksInstrumentalnessDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          instrumentalness: {
            $let: {
              "vars": {
                "instrumentalness": "$instrumentalness"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$instrumentalness", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$instrumentalness", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$instrumentalness", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$instrumentalness", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$instrumentalness", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$instrumentalness", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$instrumentalness", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$instrumentalness", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$instrumentalness", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$instrumentalness", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$instrumentalness", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$instrumentalness", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$instrumentalness", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$instrumentalness", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$instrumentalness", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$instrumentalness", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$instrumentalness", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$instrumentalness", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$instrumentalness", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$instrumentalness", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "instrumentalness": "$instrumentalness",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          instrumentalness: '$_id.instrumentalness',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          instrumentalness: 1,
        }
      },
    ]),
  tracksInstrumentalnessStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "instrumentalnessAvg": {$avg: '$instrumentalness'},
          "instrumentalnessStdDevSamp": {$stdDevSamp: '$instrumentalness'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          instrumentalnessAvg: 1,
          instrumentalnessStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksLivenessDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          liveness: {
            $let: {
              "vars": {
                "liveness": "$liveness"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$liveness", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$liveness", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$liveness", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$liveness", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$liveness", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$liveness", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$liveness", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$liveness", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$liveness", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$liveness", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$liveness", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$liveness", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$liveness", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$liveness", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$liveness", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$liveness", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$liveness", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$liveness", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$liveness", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$liveness", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "liveness": "$liveness",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          liveness: '$_id.liveness',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          liveness: 1,
        }
      },
    ]),
  tracksLivenessStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "livenessAvg": {$avg: '$liveness'},
          "livenessStdDevSamp": {$stdDevSamp: '$liveness'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          livenessAvg: 1,
          livenessStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksLoudnessDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          loudness: {
            $let: {
              "vars": {
                "loudness": "$loudness"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$loudness", -30]}, "then": '< -30'},
                    {"case": {"$lte": ["$$loudness", -28]}, "then": '-30 - -28'},
                    {"case": {"$lte": ["$$loudness", -26]}, "then": '-28 - -26'},
                    {"case": {"$lte": ["$$loudness", -24]}, "then": '-26 - -24'},
                    {"case": {"$lte": ["$$loudness", -22]}, "then": '-24 - -22'},
                    {"case": {"$lte": ["$$loudness", -20]}, "then": '-22 - -20'},
                    {"case": {"$lte": ["$$loudness", -18]}, "then": '-20 - -18'},
                    {"case": {"$lte": ["$$loudness", -16]}, "then": '-18 - -16'},
                    {"case": {"$lte": ["$$loudness", -14]}, "then": '-16 - -14'},
                    {"case": {"$lte": ["$$loudness", -12]}, "then": '-14 - -12'},
                    {"case": {"$lte": ["$$loudness", -10]}, "then": '-12 - -10'},
                    {"case": {"$lte": ["$$loudness", -8]}, "then": '-10 - -08'},
                    {"case": {"$lte": ["$$loudness", -6]}, "then": '-08 - -06'},
                    {"case": {"$lte": ["$$loudness", -4]}, "then": '-06 - -04'},
                    {"case": {"$lte": ["$$loudness", -2]}, "then": '-04 - -02'},
                    {"case": {"$lte": ["$$loudness", 0]}, "then": '-02 - 00'},
                    {"case": {"$lte": ["$$loudness", 2]}, "then": '00 - 02'},
                    {"case": {"$lte": ["$$loudness", 4]}, "then": '02 - 04'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "loudness": "$loudness",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          loudness: '$_id.loudness',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          loudness: 1,
        }
      },
    ]),
  tracksLoudnessStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "loudnessAvg": {$avg: '$loudness'},
          "loudnessStdDevSamp": {$stdDevSamp: '$loudness'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          loudnessAvg: 1,
          loudnessStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksSpeechinessDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          speechiness: {
            $let: {
              "vars": {
                "speechiness": "$speechiness"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$speechiness", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$speechiness", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$speechiness", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$speechiness", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$speechiness", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$speechiness", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$speechiness", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$speechiness", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$speechiness", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$speechiness", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$speechiness", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$speechiness", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$speechiness", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$speechiness", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$speechiness", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$speechiness", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$speechiness", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$speechiness", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$speechiness", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$speechiness", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "speechiness": "$speechiness",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          speechiness: '$_id.speechiness',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          speechiness: 1,
        }
      },
    ]),
  tracksSpeechinessStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "speechinessAvg": {$avg: '$speechiness'},
          "speechinessStdDevSamp": {$stdDevSamp: '$speechiness'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          speechinessAvg: 1,
          speechinessStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
  tracksValenceDistByYear: () =>
    Track.aggregate([
      {
        $project: {
          _id: 0,
          year: 1,
          valence: {
            $let: {
              "vars": {
                "valence": "$valence"
              },
              "in": {
                $switch: {
                  "branches": [
                    {"case": {"$lte": ["$$valence", 0.05]}, "then": '0.00 - 0.05'},
                    {"case": {"$lte": ["$$valence", 0.10]}, "then": '0.05 - 0.10'},
                    {"case": {"$lte": ["$$valence", 0.15]}, "then": '0.10 - 0.15'},
                    {"case": {"$lte": ["$$valence", 0.20]}, "then": '0.15 - 0.20'},
                    {"case": {"$lte": ["$$valence", 0.25]}, "then": '0.20 - 0.25'},
                    {"case": {"$lte": ["$$valence", 0.30]}, "then": '0.25 - 0.30'},
                    {"case": {"$lte": ["$$valence", 0.35]}, "then": '0.30 - 0.35'},
                    {"case": {"$lte": ["$$valence", 0.40]}, "then": '0.35 - 0.40'},
                    {"case": {"$lte": ["$$valence", 0.45]}, "then": '0.40 - 0.45'},
                    {"case": {"$lte": ["$$valence", 0.50]}, "then": '0.45 - 0.50'},
                    {"case": {"$lte": ["$$valence", 0.55]}, "then": '0.50 - 0.55'},
                    {"case": {"$lte": ["$$valence", 0.60]}, "then": '0.55 - 0.60'},
                    {"case": {"$lte": ["$$valence", 0.65]}, "then": '0.60 - 0.65'},
                    {"case": {"$lte": ["$$valence", 0.70]}, "then": '0.65 - 0.70'},
                    {"case": {"$lte": ["$$valence", 0.75]}, "then": '0.70 - 0.75'},
                    {"case": {"$lte": ["$$valence", 0.80]}, "then": '0.75 - 0.80'},
                    {"case": {"$lte": ["$$valence", 0.85]}, "then": '0.80 - 0.85'},
                    {"case": {"$lte": ["$$valence", 0.90]}, "then": '0.85 - 0.90'},
                    {"case": {"$lte": ["$$valence", 0.95]}, "then": '0.90 - 0.95'},
                    {"case": {"$lte": ["$$valence", 1.00]}, "then": '0.95 - 1.00'},
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          "_id": {
            "year": "$year",
            "valence": "$valence",
          },
          "count": {$sum: 1},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          valence: '$_id.valence',
          count: 1
        }
      },
      {
        $sort: {
          year: 1,
          valence: 1,
        }
      },
    ]),
  tracksValenceStatsByYear: () =>
    Track.aggregate([
      {
        $group: {
          "_id": {
            "year": "$year",
          },
          "valenceAvg": {$avg: '$valence'},
          "valenceStdDevSamp": {$stdDevSamp: '$valence'},
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          valenceAvg: 1,
          valenceStdDevSamp: 1,
        }
      },
      {
        $sort: {
          year: 1,
        }
      },
    ]),
}
