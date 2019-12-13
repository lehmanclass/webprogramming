
//This Down
const pg = require('pg');

console.log('SEED IS RUNNING');

const create = `
CREATE TABLE adoptees (
	id serial PRIMARY KEY,
	name varchar(50) NOT NULL,
	age varchar(50) NOT NULL,
	type varchar(50) NOT NULL,
	gender varchar(50) NOT NULL,
	coat_length varchar(50) NOT NULL,
	color varchar(50)NOT NULL,
	size varchar(50)NOT NULL,
	breed varchar(50) NOT NULL,
	description text NOT NULL
);
`;

const insert =
 `
	INSERT INTO adoptees (name, age, type , gender, coat_length, color, size breed, description)
	 VALUES ('pepper', ' 8 years', 'cat', 'femae', 'medium', 'black', 'large', 'maine coon', 'Sweet little kitty');
`;

const db = new pg.Client({
    user: 'Pandamoniumsz',
    host: 'localhost',
    database: 'PetShop',
    password: 'H@lpMie3',
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