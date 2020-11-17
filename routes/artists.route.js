const artists_service = require('../services/artists.service')
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

const Artist = require('../models/Artist.model');

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