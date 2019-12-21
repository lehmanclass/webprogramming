const pg = require('pg');

console.log('SEED IS RUNNING');

const buildQueryExecutor = client => query => db.query(query)
	.then(({ rows = [] }) => rows)
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

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

const insertUsers = `INSERT INTO users (first_name, last_name, email, phone, password) VALUES ('John', 'Doe', 'johndoe@gmail.com', '1234567890', '123456');`;

const insertBookins = `INSERT INTO bookings (date_booked, is_booked, guest_id) VALUES ('2019-12-09', 'Y', 1);`

const db = new pg.Client({
	user: 'fuzails',
	host: 'localhost',
	database: 'postgres',
	password: '',
	port: 5432,
});

db.connect();

const runQueries = async () => {

	const executeQuery = buildQueryExecutor(db);

	await executeQuery('drop table bookings;');
	await executeQuery('drop table users;');

	try {
		result = await executeQuery(createUsers );
		console.log(result);
	} catch (err) {
		console.error();
	}

	try {
		result = await executeQuery(createBookings );
		console.log(result);
	} catch (err) {
		console.error();
	}

	try {
		await executeQuery(insertUsers);
	   
   } catch (err) {
	   console.error();
   }


	try {
		 await executeQuery(insertBookins);
		
	} catch (err) {
		console.error();
	}

	

	// db.query('DROP TABLE IF EXISTS bookings;')
	// .then(({ rows = [] }) => {
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });
	
	// db.query('DROP TABLE IF EXISTS users;')
	// .then(({ rows = [] }) => {
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });



	// db.query(createUsers)
	// .then(({ rows = [] }) => {
	// 	console.log('create users ran successfully');
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });

	// db.query(createBookings)
	// .then(({ rows = [] }) => {
	// 	console.log('create bookings ran successfully');
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });

	// db.query(insert)
	// .then(({ rows = [] }) => {
	// 	console.log('insert ran successfully');
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });

	// db.query('SELECT * FROM users;')
	// .then(({ rows = [] }) => {
	// 	console.log(rows);
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });

	// db.query('SELECT * FROM bookings;')
	// .then(({ rows = [] }) => {
	// 	console.log(rows);
	// 	return rows;
	// })
	// .catch(err => {
	// 	console.error(err);
	// 	console.error(err.stack);
	// });

	db.end();

};

runQueries();