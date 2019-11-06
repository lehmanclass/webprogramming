const express = require('express');
const request = require('request');
const app = express();
const jsonMiddleware = express.json();
const PORT = 3000;
const DEFAULT_TOKEN = 'projecttwo';
app.use(jsonMiddleware);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const router = express.Router();


const FakeAssDatabase = require('./db.js');
const DATABASE = new FakeAssDatabase();


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 										TEST 1
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


app.get('/test_one', (req, res) => {
    const { fruit, cake } = req.query;


	data = `'{ 'message': { 'fruit': '${fruit}', 'cake': '${cake}' } }'`;
	res.json(data);
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 										TEST 2
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const test_two = (req, res) => {

    if (req.originalUrl !== '/test_two') {
        res.send('You did something wrong');
    }
    else{
        if (req.headers['content-type'] === 'application/json'){
            const fruit = req.body[`fruit`];
            const cake = req.body[`cake`];
            
        	data = `{ 'message': 'I love to eat ${fruit} with ${cake}' }'`;
			res.json(data);
    	}
	}

};

app.post('/test_two', test_two);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 										TEST 3
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/test_three/:fruit/:cake', (req, res) => {


    const { fruit, cake } = req.params;
    const token = req.headers.authorization.replace('Bearer ', '');

    if (token === DEFAULT_TOKEN) {
        const db3 = {
        test_three: [`'{ 'message': 'you sent ${fruit} and ${cake}, but I only eat ${cake}!' }'`]};


    res.json(db3.test_three);
    console.log(db3.test_three);

    } else {
        res.send('Message: Unauthorized ');
    }
    
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 										TEST 4
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const test_four = (req, res) => {

    if (req.originalUrl !== '/test_four') {
        res.send('You did something wrong');
    }
    else{
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded'){
            const fruit = req.body[`fruit`];
            const cake = req.body[`cake`];

            data = `'{ 'message': { 'i am getting really sick of eating ${fruit} after filling up on ${cake}' } }'`;
			res.json(data);
		}
	}
};

app.post('/test_four', test_four);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 										TEST 5
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.put('/test_five/write', (req,res) => {
  const {fruit, cake} = req.body;
  
  var Fruity = DATABASE.read(fruit);
  if(!Fruity) {
    DATABASE.create(fruit, 1);
  } else {
    DATABASE.update(fruit, Fruity + 1);
  }

  var Cakey = DATABASE.read(cake);
  if(!Cakey) {
    DATABASE.create(cake, 1);

  } else {
    DATABASE.update(cake, Cakey + 1);
  }

  data = `'{ 'message': { 'you sent': '${fruit}', 'and': '${cake}' } }'`;
  res.json(data);
  


});

app.get('/test_five/read',(req, res) => {
  res.json(JSON.parse(DATABASE.dump()));

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// ~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~






