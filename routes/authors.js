var express = require('express');
var router = express.Router();
var db = require('../db/api');

// list all authors
router.get('', function(req, res, next) {
  db.listAuthorsWithBooks().then(function(authors) {
    res.render('authors', {authors: authors});
  });
});

// add an author
router.get('/new', function(req, res, next) {
  res.render('author-new');
});

router.post('/new', function(req, res, next) {
  db.addNewAuthor(req.body).then(function(authorId) {
    console.log('authorId=', authorId);
    res.redirect('/authors/' + authorId);
  });
});

// author detail
router.get('/:id', function(req, res, next) {
  Promise.all([
    db.getAuthorById(req.params.id),
    db.getBooksByAuthorId(req.params.id)
  ]).
  then(function(data) {
    res.render('author-detail', {author: data[0], books: data[1]});
  });
});

// edit author
router.get('/:id/edit', function(req, res, next) {
  db.getAuthorById(req.params.id).then(function(data) {
    res.render('author-edit', {author: data});
  });
});

router.post('/:id/edit', function(req, res, next) {
  db.editAuthor(req.body, req.params.id).then(function() {
    res.redirect('/authors/' + req.params.id);
  });
});

// delete author
router.get('/:id/delete', function(req, res, next) {
  db.deleteAuthor(req.params.id).then(function() {
    res.redirect('/authors');
  }).catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
