var express = require('express');
var router = express.Router();
var db = require('../db/api');

// list all books
router.get('/books', function(req, res, next) {
  db.listBooksWithAuthors().then(function (data) {
    return Promise.all(data);
  }).then(function(books) {
    res.render('books', {books: books});
  });
});

// add a book
router.get('/books/new', function(req, res, next) {
  Promise.all([
    db.getAllAuthors(),
    db.getAllGenres()
  ]).then(function(data) {
    console.log(data);
    res.render('book-new', {authors: data[0], genres: data[1]});
  });
});

router.post('/books/new', function(req, res, next) {
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
router.get('/books/:id', function(req, res, next) {
  Promise.all([
    db.getBookById(req.params.id),
    db.getAuthorsByBookId(req.params.id)
  ]).
  then(function(data) {
    res.render('book-detail', {book: data[0], authors: data[1]});
  });
});

// edit book
router.get('/books/:id/edit', function(req, res, next) {
  Promise.all([
    db.getBookById(req.params.id),
    db.getAllGenres()
  ]).then(function(data) {
    res.render('book-edit', {book: data[0], genres: data[1]});
  });
});

router.post('/books/:id/edit', function(req, res, next) {
  db.editBook(req.body, req.params.id).then(function() {
    res.redirect('/books/' + req.params.id);
  });
});

// delete book
router.get('/books/:id/delete', function(req, res, next) {
  db.deleteBook(req.params.id).then(function() {
    res.redirect('/books');
  }).catch(function (error) {
    console.log(error);
  });
});


module.exports = router;
