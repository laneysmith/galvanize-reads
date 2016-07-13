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

// add an author
router.get('/authors/new', function(req, res, next) {
  res.render('author-new');
});

router.post('/author/new', function(req, res, next) {
  db.addNewAuthor(req.body).then(function(authorId) {
    res.redirect('/authors/' + authorId);
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

// edit author
router.get('/authors/:id/edit', function(req, res, next) {
  db.getAuthorById(req.params.id).then(function(data) {
    res.render('author-edit', {author: data});
  });
});

router.post('/authors/:id/edit', function(req, res, next) {
  db.editAuthor(req.body, req.params.id).then(function() {
    res.redirect('/authors/' + req.params.id);
  });
});

// delete autho
router.get('/authors/:id/delete', function(req, res, next) {
  db.deleteBook(req.params.id).then(function() {
    res.redirect('/authors');
  }).catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
