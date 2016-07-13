# Galvanize Reads
Galvanize reads is a CRUD app that can be used to track books & authors. You can add, update, or delete books & authors stored in a PostgreSQL database.

See it live at [https://g25-ls-galvanize-reads.herokuapp.com](https://g25-ls-galvanize-reads.herokuapp.com/).

## Installation
- `npm install -g knex` to install knex globally on your machine
- `npm install` to install app dependencies
- Set up a postgres database locally on your machine
- Create a `.env` file, using `.env.example` as a reference
- Run `knex migrate:latest && knex seed:run` to migrate & seed your database
- `npm run dev-start` to
