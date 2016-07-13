var knex = require('./knex');

module.exports = {
	getAllBooks: function() {
		return knex('book')
			.join('genre', 'book.genre_id', '=', 'genre.id')
			.select('book.id as id', 'book.title', 'genre.name as genre', 'book.description', 'book.cover_url');
	},
  getAllAuthors: function() {
    return knex('author').select();
  },
	getAuthorsByBookId: function(bookId) {
		return knex('author').select('author.first_name', 'author.last_name')
			.innerJoin('book_author', 'author.id', 'book_author.author_id')
			.where({
				'book_author.book_id': bookId
			});
	},
	listAuthorsWithBooks: function() {
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
	}

};
