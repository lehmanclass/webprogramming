const express = require('express');
const axios = require('axios');

const helpers = require('./utils');
const fakeDB = require('../fakeassdatabase/index');

const DB = new fakeDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/test_one', (req, res) => {
	const message = {
		message: {
			fruit: req.query.fruit,
			cake: req.query.cake
		}
	};
	res.json(message);
});

app.post('/test_two', (req, res) => {
	const { fruit, cake } = req.body;
	res.json({ massage: `i love to eat ${fruit} with ${cake}` });
});

app.get('/test_three/:fruit/:cake', (req, res) => {
	const { fruit, cake } = req.params;
	helpers.isAuthorized(req.headers)
		? res.json({
			message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`
		})
		: res.json({ message: 'unauthorized' });
});

app.post('/test_four', (req, res) => {
	const { fruit,cake } = req.body;
	res.json({message: `i am getting really sick of eating ${fruit} after filling up on ${cake}`});
});

app.put('/test_five/write', (req, res) => {
	const { fruit, cake } = req.body;
	helpers.handleUpdateRequest(fruit, DB);
	helpers.handleUpdateRequest(cake, DB);
	res.json({ message: `you sent ${fruit} and ${cake}` });
});

app.get('/test_five/read', (req, res) => {
	res.json(DB.data);
});

app.get('/api_baby', (req, res) => {
	axios.get('https://api.unsplash.com/search/photos',
		{
			params: { query: 'cat'},
			headers: {
				Authorization: '07536a33bc383706eebfd8dd5b83ac473ab261b99a7882cb0048ce7c5338aee2'
			}
		})
		.then(apiRes => res.json(apiRes))
		.catch(err => res.json('Sorry, something went run'));
});

app.listen(3000, () => console.log('server is running'));
