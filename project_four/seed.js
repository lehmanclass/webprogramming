const pg = require('pg');

console.log('SEED IS RUNNING');

const create = `
	CREATE TABLE connect (
		id serial PRIMARY KEY,
		task text,
		completed boolean
	);
`;

const insert = `
	INSERT INTO connect (task, completed) VALUES ('go to the store', false);
`;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 3000,
});

db.connect();

db.query(create)
	.then(({ rows = [] }) => {
		console.log('create ran successfully');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

db.query(insert)
	.then(({ rows = [] }) => {
		console.log('insert ran successfully');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});