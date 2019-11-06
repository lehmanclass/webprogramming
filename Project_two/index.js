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
	const data = req.body;
	console.log(data)
	//database.create(cake,"");
	//database.create(fruit,"");
	
    
    res.send('fruit : ',fruit, 'cake : ',cake)
});

//app.post('/test_two', (req,res) => {

//    res.send("i love to eat ", afruit, " and ", acake,"!")
//});

//app.get('/test_three', (req, res) => {

//   if (sentToken === expected_token) {
//        res.json({ "message": "you sent " + fruit + " and " + cake + ", but it only eat " + cake + "!"});
//   }    
//     else {
//         res.json({ "message": "unauthorized"}); 
//     }

// });
// app.post('/test_four', (req,res) => {

//     res.send("i am really getting sick of eating " + fruit + " after filling up on " + cake)
// });

const onListen = () => {
    console.log('i am listening');
};

app.listen(3000, onListen);
