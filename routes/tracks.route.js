const tracks_service = require('../services/tracks.service')
const express = require('express');
const range = require('lodash/range');

const router = express.Router();
const asyncHandler = require('express-async-handler')

// const Track = require('../models/Track.model');

// router.post('/books', (req, res) => {
//   const {title, summary, isbn, authors} = req.body;
//   if (authors.length === 0) {
//     return res.send({errors: {1: "code 470"}, message: "at least one author is required"})
//   }
//   const book = new Book({title, summary, isbn, authors});
//
//   book.save((err, book) => {
//     let id;
//     if (err) res.send(err);
//     else {
//       id = book._id;
//       for (let i = 0; i < book.authors.length; i++) {
//         Author.findByIdAndUpdate(book.authors[i], {$push: {books: id}}, (err) => {
//           if (err) res.send(err);
//         });
//       }
//       res.json({message: `Book with title ${title} successfully created!`});
//     }
//   });
// });

const getRange = (start, end, step) => range(start, end, step).slice(1).map((value) => value.toFixed(2))

router.get('/tracks/stats', asyncHandler(async (req, res, next) => {
  const [
    acousticnessDistByYear,
    danceabilityByYear,
    energyDistByYear,
    instrumentalnessDistByYear,
    livenessDistByYear,
    loudnessDistByYear,
    speechinessDistByYear,
    popularityDistByYear,
    tempoDistByYear,
    valenceDistByYear,
    tracksStatsByYear,
  ] = await Promise.all([
    tracks_service.tracksDistByYear('acousticness', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksDistByYear('danceability', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksDistByYear('energy', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksDistByYear('instrumentalness', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksDistByYear('liveness', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksDistByYear('loudness', getRange(-30, 4.01, 2), -2),
    tracks_service.tracksDistByYear('speechiness', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksDistByYear('popularity', getRange(0, 100.01, 5), 5),
    tracks_service.tracksDistByYear('tempo', getRange(50, 250.01, 10), 10),
    tracks_service.tracksDistByYear('valence', getRange(0, 1.01, 0.05), 0.05),
    tracks_service.tracksStatsByYear(['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'popularity', 'tempo', 'valence']),
  ]);
  res.send({
    acousticnessDistByYear,
    danceabilityByYear,
    energyDistByYear,
    instrumentalnessDistByYear,
    livenessDistByYear,
    loudnessDistByYear,
    speechinessDistByYear,
    popularityDistByYear,
    tempoDistByYear,
    valenceDistByYear,
    tracksStatsByYear
  });

  // TODO Artists


  // Track.find({}).exec((err, tracks) => {
  //   tracks.forEach(async (track) => {
  //     track.artists = JSON.stringify(track.artists).replace(/["\[\]' ]/g, '').split(',');
  //     console.log(track.id, track.artists)
  //     await track.save();
  //   })
  //   if (err) res.send(err);
  //   res.send(tracks.slice(0, 10));
  // });

}));

// router.get('/books/:book_id', (req, res) => {
//   const {book_id} = req.params;
//   Book.findById(book_id, (err, book) => {
//     if (err) res.send(err);
//     res.json(book);
//   })
// });
//
// router.put('/books/:book_id', (req, res) => {
//   const {book_id} = req.params;
//   Book.findById(book_id, (err, book) => {
//     if (err) res.send(err);
//
//     book = extend(book, req.body);
//
//     book.save((err) => {
//       if (err) res.send(err);
//
//       res.json({message: 'Book updated'});
//     });
//   });
// });
//
// router.delete('/books/:book_id', (req, res) => {
//   const {book_id} = req.params;
//   Book.remove({
//     _id: book_id
//   }, (err, book) => {
//     if (err) res.send(err);
//   });
//   Author.updateMany({}, {$pull: {books: book_id}}, (err) => {
//     if (err) res.send(err);
//
//     res.json({message: "Successfully deleted book"});
//   });
// });

module.exports = router;