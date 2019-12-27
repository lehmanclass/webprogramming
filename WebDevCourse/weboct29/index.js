const express = require('express');
const FakeAssDatabase = require('./db.js');
const app = express();


const PORT = 3000;

const DATABASE = new FakeAssDatabase();

app.get('/db/read', (req, res) => {
	res.send(DATABASE.data);
});

app.get('/db/write', (req, res) => {
	DATABASE.create(req.query.key, req.query.value);
	res.json(DATABASE.data);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`))