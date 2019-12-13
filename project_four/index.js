const express = require('express');
const pg = require('pg');
const app = express();

const db = new pg.Client({
  user: 'fuzails',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('build'));
app.use(express.json());

db.connect();

const readBookings = () => db.query('SELECT * from bookings;');

const readUsers = () => db.query('SELECT * from users;');

app.get('/login', (req,res)=> readUsers().then(({rows : users})=> {
	const email = req.email;
	const sentPassword = req.pasword;

	let userExists = false;
	let passwordIsCorrect = false;

	const results = await db.query(`SELECT * FROM users where email = ${email};`);
	const usersArray = results.rows;

	let authorized = false;
	if (usersArray.length === 0) {
		return res.json({ "authorized": authorized })
	}
	userExists = true;

	const matchingUser = usersArray[0];
	const passwordInDatabase = matchingUser.password;

	if (sentPassword === passwordInDatabase) {
		passwordIsCorrect = true;
	}

	if (userExists && passwordIsCorrect) {
		authorized = true;
	}
	return res.json({ "authorized": authorized });
});

app.get('/bookings/read', (_, res) => readBookings().then(({ rows: bookings }) => res.json({ bookings })));

app.put('/bookings/update', async (req, res) => {
	const { body: { date_booked, is_booked } } = req;
	console.log('date_booked, is_booked', date_booked, is_booked);
	await db.query(`UPDATE bookings set completed = ${is_booked} where date_booked = ${date_booked};`);
	const { rows: bookings } = await readBookings();
	return res.json({ bookings });
});

app.post('/bookings/delete', async (req, res) => {
	const {
		body: {
			date_booked
		} = {}
	} = req;
	await db.query(`DELETE from bookings where date_booked = ${date_booked};`);
	const { rows: bookings } = await readBookings();
	return res.json({ bookings });
});

app.post('/datepicker', async (req, res) => {
	const {
		body: {
			date
		}
	} = req
	await db.query(`INSERT INTO bookings (date_booked, is_booked) VALUES ('${date}', 'Y')`);
	const { rows: bookings } = await readBookings();
	return res.json({ bookings });
});

app.listen(3000, () => console.log('listnin'));