var knex = require('./knex');

module.exports = {
	// for books routes
	getAllBooks: function() {
		return knex('book')
			.join('genre', 'book.genre_id', '=', 'genre.id')
			.select('book.id as id', 'book.title', 'genre.name as genre', 'book.description', 'book.cover_url');
	},
	getAuthorsByBookId: function(bookId) {
		return knex('author').select('author.first_name', 'author.last_name', 'author.id as author_id')
			.innerJoin('book_author', 'author.id', 'book_author.author_id')
			.where({
				'book_author.book_id': bookId
			});
	},
	listBooksWithAuthors: function() {
		return this.getAllBooks()
			.then((returnedBooks) => {
				return returnedBooks.map((book) => {
					return this.getAuthorsByBookId(book.id)
						.then(function(authors) {
              book.authors = authors;
              // console.log(book);
              return book;
						});
				});
			}
    );
	},
	getBookById: function(id) {
		return knex('book')
			.join('genre', 'book.genre_id', '=', 'genre.id')
			.select('book.id as id', 'book.title', 'genre.name as genre', 'genre.id as genre_id','book.description', 'book.cover_url')
			.where({'book.id': id})
			.first();
	},
	addNewBook: function(book) {
		return knex('book').insert(book).returning('id');
	},
	addBookAuthorRelationship: function(bookId, authorId) {
		return knex('book_author').insert({book_id: bookId, author_id: authorId}).returning('book_id');
	},
	getAllGenres: function() {
		return knex('genre')
			.select();
	},
	deleteBook: function(bookId) {
		return knex('book').where({id: bookId}).del();
	},
	editBook: function(book, bookId) {
		return knex('book').where({id: bookId}).update(book);
	},
	// for authors routes
	getAllAuthors: function() {
		return knex('author').select();
	},
	getBooksByAuthorId: function(authorId) {
		return knex('book').select('book.title', 'book.id as book_id')
			.innerJoin('book_author', 'book.id', 'book_author.book_id')
			.where({
				'book_author.author_id': authorId
			});
	},
	listAuthorsWithBooks: function() {
		return this.getAllAuthors()
			.then((returnedAuthors) => {
				return returnedAuthors.map((author) => {
					return this.getBooksByAuthorId(author.id)
						.then(function(books) {
              author.books = books;
              return author;
						});
				});
			}
    );
	},
	getAuthorById: function(id) {
		return knex('author')
			.select()
			.where({'author.id': id})
			.first();
	},
	addNewAuthor: function(author) {
		return knex('author').insert(author).returning('id');
	},
	deleteAuthor: function(authorId) {
		return knex('author').where({id: authorId}).del();
	},
	editAuthor: function(author, authorId) {
		return knex('author').where({id: authorId}).update(author);
	},
};
