var find = require('../seed_helper.js');

exports.seed = function(knex, Promise) {
	return Promise.all([
		knex('book').select(),
		knex('author').select()
	]).then(function(result) {
		var book = result[0];
		var author = result[1];
		return Promise.all([
			knex('book_author').insert({
				book_id: find.findFromList('Python In A Nutshell', book, 'title'),
				author_id: find.findFromList('Alex', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('Python In A Nutshell', book, 'title'),
				author_id: find.findFromList('Anna', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('Python In A Nutshell', book, 'title'),
				author_id: find.findFromList('Steve', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('Think Python', book, 'title'),
				author_id: find.findFromList('Allen B.', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('Learning React Native', book, 'title'),
				author_id: find.findFromList('Bonnie', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('You Don\'t Know JS: ES6 & Beyond', book, 'title'),
				author_id: find.findFromList('Kyle', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('You Don\'t Know JS: Scope & Closures', book, 'title'),
				author_id: find.findFromList('Kyle', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('You Don\'t Know JS: Async & Performance', book, 'title'),
				author_id: find.findFromList('Kyle', author, 'first_name')
			}),
			knex('book_author').insert({
				book_id: find.findFromList('Daniel\s Diary', book, 'title'),
				author_id: find.findFromList('Daniel', author, 'first_name')
			})
		]);
	});
};
