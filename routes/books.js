var express = require('express');
var router = express.Router();
var db = require('../db/api');

// list all books
router.get('', function(req, res, next) {
  Promise.all([
    db.listBooksWithAuthors(),
    db.getAllGenres()
  ]).then(function(data) {
    res.render('books', {books: data[0], genres: data[1]});
  });
});

// add a book
router.get('/new', function(req, res, next) {
  Promise.all([
    db.getAllAuthors(),
    db.getAllGenres()
  ]).then(function(data) {
    res.render('book-new', {authors: data[0], genres: data[1]});
  });
});

router.post('/new', function(req, res, next) {
  var newBook = {
    title: req.body.title,
    genre_id: req.body.genre_id,
    description: req.body.description,
    cover_url: req.body.cover_url
  };
  var authorId = req.body.author_id;
  db.addNewBook(newBook).then(function(bookId) {
    db.addBookAuthorRelationship(bookId[0], authorId).then(function() {
      res.redirect('/books/' + bookId);
    }
  );
  });
});

// book detail
router.get('/:id', function(req, res, next) {
  Promise.all([
    db.getBookById(req.params.id),
    db.getAuthorsByBookId(req.params.id)
  ]).
  then(function(data) {
    res.render('book-detail', {book: data[0], authors: data[1]});
  });
});

// edit book
router.get('/:id/edit', function(req, res, next) {
  Promise.all([
    db.getBookById(req.params.id),
    db.getAllGenres()
  ]).then(function(data) {
    res.render('book-edit', {book: data[0], genres: data[1]});
  });
});

router.post('/:id/edit', function(req, res, next) {
  db.editBook(req.body, req.params.id).then(function() {
    res.redirect('/books/' + req.params.id);
  });
});

// delete book
router.get('/:id/delete', function(req, res, next) {
  db.deleteBook(req.params.id).then(function() {
    res.redirect('/books');
  }).catch(function (error) {
    console.log(error);
  });
});


module.exports = router;
