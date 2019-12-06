const pg = require('pg');

console.log('SEED IS RUNNING');

const create = `
	CREATE TABLE user (
        id serial PRIMARY KEY,
        User Name varchar(15) NOT NULL, 
        Password varchar(16) NOT NULL,
        First Name varchar(18) NOT NULL,
        Last Name varchar(18) NOT NULL,
        Email Address String NOT NULL,
        Confirmation boolean NOT NULL,
        ZipCode int check (ZipCode <= 99999)
    );
    
    CREATE TABLE Posts (
        
    )
`;

const insert = `
	INSERT INTO todos (task, completed) VALUES ('go to the store', false);
`;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
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