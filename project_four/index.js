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

//app.use(express.static('build'));

// Temporal - when I server the build folder, I can remove it.
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	next();
});

app.use(express.json());

db.connect();

const readBookings = () => db.query('SELECT * from bookings;');

const readUsers = () => db.query('SELECT * from users;');
// readUsers().then( async ({rows : users})

app.post('/login', async (req, res) => {
	const email = req.body.email;
	const sentPassword = req.body.sentPassword;
	console.log(req.body)

	let userExists = false;
	let passwordIsCorrect = false;

	const results = await db.query(`SELECT * FROM users where email = '${email}';`);
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

	const { id, first_name, last_name } = usersArray[0];
	const userInformation = {
		id, email: usersArray[0].email , first_name, last_name
	}
	res.json({ "authorized": authorized, user: userInformation  });
});

app.get('/bookings/read', async (_, res) => readBookings().then(({ rows: bookings }) => res.json({ bookings })));

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

app.listen(5000, () => console.log('listnin'));