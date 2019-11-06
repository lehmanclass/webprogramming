const express = require('express');
const PORT = 3000;
const TOKEN = 'projecttwo';
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/test_one', (req,res)=>{
    const message = {
        message:{
            fruit : req.query.fruit,
            cake : req.query.cake,
        }
    };
    res.json(message)
});

app.post('/test_two', (req, res) =>{
    const message = {message: `i love to eat ${req.body.fruit} with ${req.body.cake}`}
    res.json(message)
});

app.get('/test_three/:grape/:angelfood', (req, res) =>{
    console.log('headers ->', req.headers);
    console.log('req.body ->', req.body);

    const token = req.headers.authorization.replace('Bearer ', '');

    if (TOKEN !== token) {
        return res.json({ message: 'unauthorized' });
    }
    return res.json({ message: `you sent ${req.params.grape} and ${req.params.angelfood}, but I only eat ${req.params.angelfood}!`});
});

app.post('/test_four', (req, res) =>{
    console.log('headers ->', req.headers);
    console.log('req.body ->', req.body);
    return res.json({ message: `i am getting really sick of eating ${req.body.fruit} after filling up on ${req.body.cake}`});
});



class FakeAssDatabase{

	constructor() {
		this.data = {};
	}

	create(keyString, valueString) { // OOPS - the value should be a number
		if (this.data[keyString]) {
			throw new Error(`${keyString} already exists!`);
		}
		this.data[keyString] = valueString;
	}

	read(keyString) {
		return this.data[keyString];
	}

	update(keyString, valueString) { // public service announcement - value is a number
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

}

const data = new FakeAssDatabase();


app.put('/test_five/write', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    try{
        data.create(fruit, 1);
    }
    catch{
        data.update(fruit, data.read(fruit) + 1);
    }
    try{
        data.create(cake, 1);
    }
    catch{
        data.update(cake, data.read(cake) + 1);
    }
    res.json({
        message: 'you sent ' + fruit  + ' and ' + cake
    })
    
});
    
app.get('/test_five/read', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    res.json(
        data.data
    )
})
    
app.put('/test_five/write', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    res.json({ message: `i am getting really sick of eating ${fruit} after filling up on ${cake}`});
    
})
    
app.get('/test_five/read/:fruit/:cake', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    try{
        data.create(fruit, 1);
    }
    catch{
        data.update(fruit, fruit + 1);
    
    }
    try{
        data.create(cake, 1);
    }
    catch{
        data.update(cake, 1);
    
    }
    res.json(data.data)
})

app.listen(PORT,()=>console.log("server is running"));