exports.up = function(knex, Promise) {
	return knex.schema.createTable('genre', function(table) {
		table.increments();
		table.string('name');
	}).then(function() {
		return knex.schema.createTable('book', function(table) {
			table.increments();
			table.string('title');
			table.integer('genre_id').references('id').inTable('genre').onDelete('cascade');
			table.text('description');
			table.string('cover_url');
		});
	}).then(function() {
		return knex.schema.createTable('author', function(table) {
			table.increments();
			table.string('first_name');
			table.string('last_name');
			table.text('bio');
			table.string('portrait_url');
		});
	}).then(function() {
		return knex.schema.createTable('book_author', function(table) {
			table.integer('book_id').references('id').inTable('book').onDelete('cascade');
			table.integer('author_id').references('id').inTable('author').onDelete('cascade');
		});
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('book_author')
		.then(function() {
			return knex.schema.dropTableIfExists('author');
		}).then(function() {
			return knex.schema.dropTableIfExists('book');
		}).then(function() {
			return knex.schema.dropTableIfExists('genre');
		});
};
