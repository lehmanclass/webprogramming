const pg = require('pg');

console.log('SEED IS RUNNING');

const createUser = `
	DROP TABLE if exists users;
	CREATE TABLE users(
		id serial PRIMARY KEY,
		username text,
		email text unique,
		password text
	);
`;
const createTweet = `
	DROP TABLE if exists tweettable;
	CREATE TABLE tweettable(
		id serial PRIMARY KEY,
		tweet text,
		userId INTEGER not null
	);
`;


const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

db.connect();

db.query(createUser)
	.then(({ rows = [] }) => {
		console.log('create ran successfully createUser');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

db.query(createTweet)
	.then(({ rows = [] }) => {
		console.log('create ran successfully createTweet');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

// db.query(insert, )
// 	.then(({ rows = [] }) => {
// 		console.log('insert ran successfully');
// 		return rows;
// 	})
// 	.catch(err => {
// 		console.error(err);
// 		console.error(err.stack);
// 	});