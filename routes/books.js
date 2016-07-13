var express = require('express');
var router = express.Router();
var db = require('../db/api');

// Populate list of books
router.get('/books', function(req, res, next) {
  db.listBooksWithAuthors().then(function (data) {
    return Promise.all(data)
  }).then(function(books) {
    res.render('books', {books: books});
  });
});

module.exports = router;
