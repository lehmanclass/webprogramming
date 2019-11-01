
const express = require('express');
const app = express();
const jsonMiddleware = express.json();
const PORT = 3000;
const DEFAULT_TOKEN = 'projecttwo';

const AnotherFakeDatabase = {
	"willmostlikelyneed@cuny.edu": 1
};

app.use(jsonMiddleware);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 										TEST 1
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


app.get('/test_one', (req, res) => {
    const { fruit, cake } = req.query;

    const db = {
    test_one: [`{ "message": { "fruitMessage": ${fruit}, "cakeMessage": ${cake} } }`], 
    fruits: ['mango', 'fruits']

};
    res.json(db.test_one);
    console.log(db.test_one);
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

            const db2 = {
    test_two: [`{ "message": { "I love to eat": ${fruit}, "with": ${cake} } }`]};

            res.json(db2.test_two);
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
        test_three: [`{ "message": "you sent ${fruit} and ${cake}, but I only eat ${cake}!" }`]};

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

            const db2 = {
    test_two: [`{ "message": { "I love to eat": ${fruit}, "with": ${cake} } }`]};

            res.json(db2.test_two);
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
  res.json({ message: `you sent ${fruit} and ${cake}` });


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






