const tracks_service = require('../services/tracks.service')
const express = require('express');
// let extend = require('lodash/extend');

const router = express.Router();
const asyncHandler = require('express-async-handler')

const Track = require('../models/Track.model');

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

router.get('/tracks/stats', asyncHandler(async (req, res, next) => {
  const [
    acousticnessDistByYear,
    acousticnessStatsByYear,
    danceabilityByYear,
    danceabilityStatsByYear,
    energyDistByYear,
    energyStatsByYear,
    instrumentalnessDistByYear,
    instrumentalnessStatsByYear,
    livenessDistByYear,
    livenessStatsByYear,
    loudnessDistByYear,
    loudnessStatsByYear,
    speechinessDistByYear,
    speechinessStatsByYear,
    valenceDistByYear,
    valenceStatsByYear
  ] = await Promise.all([
    tracks_service.tracksAcousticnessDistByYear(),
    tracks_service.tracksAcousticnessStatsByYear(),
    tracks_service.tracksDanceabilityDistByYear(),
    tracks_service.tracksDanceabilityStatsByYear(),
    tracks_service.tracksEnergyDistByYear(),
    tracks_service.tracksEnergyStatsByYear(),
    tracks_service.tracksInstrumentalnessDistByYear(),
    tracks_service.tracksInstrumentalnessStatsByYear(),
    tracks_service.tracksLivenessDistByYear(),
    tracks_service.tracksLivenessStatsByYear(),
    tracks_service.tracksLoudnessDistByYear(),
    tracks_service.tracksLoudnessStatsByYear(),
    tracks_service.tracksSpeechinessDistByYear(),
    tracks_service.tracksSpeechinessStatsByYear(),
    tracks_service.tracksValenceDistByYear(),
    tracks_service.tracksValenceStatsByYear(),
  ]);
  res.send({
    acousticnessDistByYear,
    acousticnessStatsByYear,
    danceabilityByYear,
    danceabilityStatsByYear,
    energyDistByYear,
    energyStatsByYear,
    instrumentalnessDistByYear,
    instrumentalnessStatsByYear,
    livenessDistByYear,
    livenessStatsByYear,
    loudnessDistByYear,
    loudnessStatsByYear,
    speechinessDistByYear,
    speechinessStatsByYear,
    valenceDistByYear,
    valenceStatsByYear
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