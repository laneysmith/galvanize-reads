var express = require('express');
var router = express.Router();
var db = require('../db/api');

// list all authors
router.get('/authors', function(req, res, next) {
  db.listAuthorsWithBooks().then(function (data) {
    return Promise.all(data);
  }).then(function(authors) {
    res.render('authors', {authors: authors});
  });
});

// author detail
router.get('/authors/:id', function(req, res, next) {
  Promise.all([
    db.getAuthorById(req.params.id),
    db.getBooksByAuthorId(req.params.id)
  ]).
  then(function(data) {
    res.render('author-detail', {author: data[0], books: data[1]});
  });
});


module.exports = router;
