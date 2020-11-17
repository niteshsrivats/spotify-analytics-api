const tracks_service = require('../services/tracks.service')
const express = require('express');
const range = require('lodash/range');
// const {v4: uuidv4} = require('uuid');

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

const getRange = (start, end, step) => range(start, end, step).map((value) => parseFloat(value.toFixed(1)))

router.get('/tracks/:year/distribution', asyncHandler(async (req, res, next) => {
  const {year} = req.params;

  const fields = [
    {name: 'acousticness', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'danceability', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'energy', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'instrumentalness', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'liveness', range: getRange(0, 1, 0.1), step: 0.1},
    // {name: 'loudness', range: getRange(-28, 2, 4), step: 2},Tra
    // {name: 'popularity', range: getRange(0, 100, 10), step: 10},
    // {name: 'tempo', range: getRange(60, 250, 10), step: 10},
    {name: 'speechiness', range: getRange(0, 1, 0.1), step: 0.1},
    {name: 'valence', range: getRange(0, 1, 0.1), step: 0.1},
  ];

  let [
    tracksDistForYear,
    tracksStatsByYear,
  ] = await Promise.all([
    tracks_service.tracksDistForYear(year, fields),
    tracks_service.tracksStatsByYear(['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence']),
  ]);

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

  res.send({
    tracksDistForYear,
    tracksStatsByYear
  });
}));

// Track.find({}).exec((err, tracks) => {
//   tracks.forEach(async (track) => {
//     track.artists = JSON.stringify(track.artists).replace(/["\[\]' ]/g, '').split(',');
//     console.log(track.id, track.artists)
//     await track.save();
//   })
//   if (err) res.send(err);
//   res.send(tracks.slice(0, 10));
// });


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