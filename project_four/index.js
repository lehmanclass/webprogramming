const express    = require('express');
const path = require('path');
const { Client } = require('pg');
const app        = express();
const port       = 3000;

const buildQueryExecutor = client => query => db.query(query)
	.then(({ rows = [] }) => rows)
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('build'));
app.use(express.json());

db.connect();

// const main = async () => {

const executeQuery = buildQueryExecutor(db);

const readTodos = () => db.query('SELECT * from user;');
//const readTodos = () => db.query('SELECT * from tweettext;');

// This will create an Account whre the date will store in postgree

app.post('/tweet/createUser', (req, res) => {
	const {
		body: {
			username,
			email,
			password,
		}
	} = req

	console.log(req.body);

	db.query(`INSERT INTO users (username, email, password) VALUES ('${username}','${email}','${password}')`,
	(result) => {
		res.json({result});
	});
	
});

// this is login part where the user will be login after creating a Accout 
app.post('/tweet/login',(req,res) => {

	const{ body: { email, password }} = req

	db.query(`SELECT * from users where email = '${email}' and password = '${password}'`)
		.then((result) => {
			res.json({userId: result.rows[0].id});
		});

});

// Validation where it will check is the user is exist or not
app.post('/tweet/validation',(req,res) => {

	const { body: { id }} = req

	db.query(`SELECT * from users where id = '${id}' `)
		.then((result) => {

			if(!result.rows.length) {
				return res.json({ message: 'this accout does not exist' });
			}

			res.json({userId: result.rows[0].id});
		});

});

// This will create a table for the user that allows to store the data "the message"
//
app.post('/tweet/createTweet', (req, res) => {
	const { body: { tweetText, userId } } = req;

	db.query(`INSERT INTO tweettable (tweet, userId) VALUES ('${tweetText}', '${userId}') returning *`)
		.then(({rows: tweet}) => {
			db.query(`SELECT * from users where id = ${userId}`)
			.then((result) => {

				res.json({ tweet: {...tweet[0], username: result.rows[0].username}});
			})
			

		});
	
});



app.get('/tweet/tweets' ,(req,res) =>{
	db.query(`SELECT * from tweettable`)
		.then((result) => {
			res.json({ tweets: result.rows});
		});

});

app.get('/tweet/tweets/:userId' ,(req,res) =>{
	const userId = req.params.userId;
	
	db.query(`SELECT tweettable.id, tweet, username from tweettable, users where tweettable.userId = ${userId} and users.id = ${userId} ORDER BY id DESC`)
		.then((result) => {
			res.json({ tweets: result.rows});
		});

});

app.get('/tweet/users/:searchTerm' ,(req,res) =>{
	const searchTerm = req.params.searchTerm;
	db.query(`SELECT * from users where LOWER(username) LIKE LOWER('%${searchTerm}%')`)
		.then((result) => {
			res.json({ users: result.rows});
		});

});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => console.log(`I am listening on http://localhost:${port}!`));