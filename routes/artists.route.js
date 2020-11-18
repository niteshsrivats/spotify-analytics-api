const artists_service = require('../services/artists.service')
const express = require('express');

const router = express.Router();
const asyncHandler = require('express-async-handler')

router.get('/artists/names', asyncHandler(async (req, res, next) => {
  let result = await artists_service.getArtistNames();
  res.send(result[0].names);
}));

router.get('/artists/stats', asyncHandler(async (req, res, next) => {
  const tracks = await artists_service.artistAverageStdDev(['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence']);
  res.send(tracks);
}));

router.get('/artists/:name', asyncHandler(async (req, res, next) => {
  const {name} = req.params;
  const artist = await artists_service.getArtist(name);
  res.send(artist);
}));

module.exports = router;