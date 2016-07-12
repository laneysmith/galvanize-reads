exports.seed = function(knex, Promise) {
	return Promise.all([
		knex('genre').insert({
			name: 'Python'
		}),
		knex('genre').insert({
			name: 'JavaScript'
		}),
		knex('genre').insert({
			name: 'Fantasy'
		})
	]);
};
