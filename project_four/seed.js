const pg = require('pg');

console.log('SEED IS RUNNING');

const createBookings = `
	CREATE TABLE bookings (
		id serial PRIMARY KEY,
		guest_id integer references users(id),
		date_booked text,
		is_booked text
	);
`;


const createUsers = `
	CREATE TABLE users (
		id serial PRIMARY KEY,
		first_name text,
		last_name text,
		email text,
		phone text,
		password text
	);
`;

const insert = `
	INSERT INTO bookings (date_booked, is_booked) VALUES ('2019-12-09', 'Y');
	INSERT INTO users (first_name, last_name, email, phone, password) VALUES ('John', 'Doe', 'johndoe@gmail.com', '1234567890', '123456');

`;

const db = new pg.Client({
	user: 'fuzails',
	host: 'localhost',
	database: 'postgres',
	password: 'postgres',
	port: 5432,
});

db.connect();

const runQueries = async () => {


	db.query('DROP TABLE IF EXISTS bookings;')
	.then(({ rows = [] }) => {
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});
	
	db.query('DROP TABLE IF EXISTS users;')
	.then(({ rows = [] }) => {
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});



	db.query(createUsers)
	.then(({ rows = [] }) => {
		console.log('create users ran successfully');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

	db.query(createBookings)
	.then(({ rows = [] }) => {
		console.log('create bookings ran successfully');
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

	db.query('SELECT * FROM users;')
	.then(({ rows = [] }) => {
		console.log(rows);
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

	db.query('SELECT * FROM bookings;')
	.then(({ rows = [] }) => {
		console.log(rows);
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

};

runQueries();