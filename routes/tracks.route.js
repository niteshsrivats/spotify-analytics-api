const tracks_service = require('../services/tracks.service')
const artists_service = require('../services/artists.service')
const express = require('express');
const range = require('lodash/range');
const extend = require('lodash/extend');

const router = express.Router();
const asyncHandler = require('express-async-handler')

const Track = require('../models/Track.model');

const getRange = (start, end, step) => range(start, end, step).map((value) => parseFloat(value.toFixed(1)))

router.get('/tracks/:year/distribution', asyncHandler(async (req, res, next) => {
  const {year} = req.params;

  const fields = [
    {name: 'acousticness', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'danceability', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'energy', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'instrumentalness', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'liveness', range: getRange(0, 1, 0.1), step: 0.1},
    // {name: 'loudness', range: getRange(-28, 4, 2), step: 2},
    // {name: 'popularity', range: getRange(0, 100, 10), step: 10},
    // {name: 'tempo', range: getRange(60, 250, 10), step: 10},
    {name: 'speechiness', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'valence', range: getRange(0, 1, 0.1), step: 0.1},
  ];

  let tracksDistForYear = await tracks_service.tracksDistForYear(year, fields);

  tracksDistForYear = tracksDistForYear[0];
  for (let i = 0; i < fields.length; i++) {
    const distribution = {labels: [], values: []};
    const {name, range, step} = fields[i];

    for (let j = 0; j < range.length; j++) {
      const labelFromRange = range[j].toFixed(1) + ' - ' + (range[j] + step).toFixed(1);

      distribution.labels.push(labelFromRange);

      if (tracksDistForYear[name][j]) {
        const {count, [name]: label} = tracksDistForYear[name][j];
        labelFromRange !== label ? distribution.values.push(0) : distribution.values.push(count);
      } else {
        distribution.values.push(0);
      }
    }

    tracksDistForYear[name] = distribution;
  }

  res.send({tracksDistForYear});
}));

router.get('/tracks/stats', asyncHandler(async (req, res, next) => {
  const tracksStatsByYear = await tracks_service.tracksStatsByYear(['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence']);

  res.send({tracksStatsByYear});
}));

router.get('/tracks/charted', asyncHandler(async (req, res, next) => {
  const chartedTrackers = await tracks_service.getChartTracks();

  res.send(chartedTrackers);
}));

router.get('/tracks', asyncHandler(async (req, res, next) => {
  const [count, tracks] = await Promise.all([Track.estimatedDocumentCount(), Track.find({}).limit(1000)]);

  res.send({count, tracks});
}));

router.post('/tracks', asyncHandler(async (req, res, next) => {
  const track = new Track(req.body);
  await track.save();
  await artists_service.addNewArtists(track.artists);

  res.json({message: `Track with title ${track.name} successfully created!`});
}));

router.delete('/tracks/:id', asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  let [track] = await Track.find({id: id});
  let message;
  if (track) {
    await Track.remove({id: id});
    await artists_service.deleteEmptyArtists(track.artists);
    message = `Track with title ${track.name} successfully deleted!`;
  } else {
    message = `Track with id ${id} does not exist!`;
  }

  res.json({message: message});
}));

router.put('/tracks/:id', asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  let [track] = await Track.find({id: id});
  let message = `Track with title ${track.name} successfully created!`;

  if (track) {
    track = extend(track, req.body);
    message = `Track with title ${track.name} successfully updated!`
  }
  await track.save();
  await artists_service.addNewArtists(track.artists);

  res.json({message});
}));

module.exports = router;