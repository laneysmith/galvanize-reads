var express = require('express');
var router = express.Router();
var db = require('../db/api');

//
router.get('/books', function(req, res, next) {
  db.listBooksWithAuthors().then(function (data) {
    return Promise.all(data);
  }).then(function(books) {
    res.render('books', {books: books});
  });
});

router.get('/books/:id', function(req, res, next) {
  Promise.all([
    db.getBookById(req.params.id),
    db.getAuthorsByBookId(req.params.id)
  ]).
  then(function(data) {
    res.render('book-detail', {book: data[0], authors: data[1]});
  });
});


module.exports = router;
