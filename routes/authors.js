var express = require('express');
var router = express.Router();
var db = require('../db/api');

// Populate list of books
router.get('/authors', function(req, res, next) {
  db.listAuthorsWithBooks().then(function (data) {
    return Promise.all(data);
  }).then(function(authors) {
    res.render('authors', {authors: authors});
  });
});

module.exports = router;
