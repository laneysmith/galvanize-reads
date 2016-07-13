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
  console.log(req.body);
  db.addNewBook(req.body).then(function(bookId) {
    console.log('book id =', bookId);
    res.redirect('/books/' + bookId);
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

// delete book
router.get('/books/:id/delete', function(req, res, next) {
  db.deleteBook(req.params.id).then(function() {
    res.redirect('/books');
  }).catch(function (error) {
    console.log(error);
  });
});


module.exports = router;
