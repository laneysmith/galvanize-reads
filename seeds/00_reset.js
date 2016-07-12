exports.seed = function(knex, Promise) {
	return knex('book_author').del()
		.then(function() {
			return knex('author').del();
		}).then(function() {
			return knex('book').del();
		}).then(function() {
			return knex('genre').del();
		});
};
