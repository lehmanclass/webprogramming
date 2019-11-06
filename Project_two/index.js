const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true }));

class FakeAssDatabase {
	constructor() {
		this.data = {};
	}
	create(keyString, valueString) {
		if (this.data[keyString]) {
			throw new Error(`${keyString} already exists!`);
		}
		this.data[keyString] = valueString;
	}
	read(keyString) {
		return this.data[keyString];
	}
	update(keyString, valueString) {
		if (!this.data[keyString]) {
			throw new Error(`${keyString} does not exist!`);
		}
		this.data[keyString] = valueString;
	}
	delete(keyString) {
		if (!this.data[keyString]) {
			throw new Error(`${keyString} does not exist!`);
		}
		delete this.data[keyString];
	}
	dump() {
		return JSON.stringify(this.data);
	}
};


const database = new FakeAssDatabase ();	

app.get('/test_one', (req, res) => {
	const data = req.query;
	console.log(data)
    res.json({ "message" : { "fruit": data.fruit, "cake": data.cake }})
});

app.post('/test_two', (req,res) => {
	const data = req.body
	console.log(data)

   res.json({ "message": "i love to eat "+data.fruit+" with "+data.cake})
});

app.get('/test_three/:fruit/:cake', (req, res) => {
	const expected_token = "projecttwo";
	const sentToken = req.headers.authorization.replace('Bearer ', '');
	const data = req.params;
  if (sentToken === expected_token) {
       res.json({ "message" : "you sent " + data.fruit + " and " + data.cake + ", but I only eat " + data.cake + "!"});
  }    
    else {
        res.json({ "message": "unauthorized"}); 
    }

});

app.post('/test_four', (req,res) => {
	const data = req.body;
    res.send({"message" : "i am getting really sick of eating " + data.fruit + " after filling up on " + data.cake});
});

app.put('/test_five/write', (req, res) => {
	const data = req.body;

	try {
		database.create(data.fruit, 1)
	} catch (err) {
		// try to update
		const previous = database.read(data.fruit);
		database.update(data.fruit, previous + 1);
	}

	try {
		database.create(data.cake, 1)
	} catch (err) {
		// try to update
		const previous = database.read(data.cake);
		database.update(data.cake, previous + 1);
	}

	res.json({ "message": "you sent " + data.fruit + " and " + data.cake});
});

app.get('/test_five/read', (req, res) => {

	res.json(database.data);
});

const onListen = () => {
    console.log('i am listening');
};

app.listen(3000, onListen);
