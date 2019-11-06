const express = require('express');

const app = express();

app.use(express.json());

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
       res.json({ "message" : "you sent " + data.fruit + " and " + data.cake + ", but i only eat " + data.cake + "!"});
  }    
    else {
        res.json({ "message": "unauthorized"}); 
    }

});

app.post('/test_four', (req,res) => {

    res.send("i am really getting sick of eating " + fruit + " after filling up on " + cake)
});

const onListen = () => {
    console.log('i am listening');
};

app.listen(3000, onListen);
