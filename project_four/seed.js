const pg = require('pg');

console.log('SEED IS RUNNING');

const create = `
	CREATE TABLE users (
		id serial PRIMARY KEY,
		name varchar(50) NOT NULL,
		password varchar(50) NOT NULL
	);
`;

const insert = `
	INSERT INTO users (name, password) 
	VALUES ('john', 'doe');
`;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

db.connect();

function check(form) {
	if(form.john.value == "john" && form.doe.value == "doe") {
		location.href='AnimeZone.html';
	}
	else {
		alert("Error Password or Username is incorrect")
	}
}
