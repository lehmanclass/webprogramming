const express = require('express'); //Imports Express 
const FakeDatabase = require('./db.js'); //Imports Fake Database 
const app = express(); //Creates an instance of express

const PORT = 3000;

const DATABASE = new FakeDatabase(); // For test 5

app.use(express.json());
app.use(express.urlencoded({extended: true})); //For test four
//For Test one

app.get(`/test_one`, (req, res) => {
    const { fruit, cake } = req.query; //

    res.json({
        message: {
            fruit,
            cake
        }
    });
});

//For Test two

app.post('/test_two', (req, res) => {
    const {fruit, cake} = req.body;

    res.json({
        message: `i love to eat ${fruit} with ${cake}`
    });
});

//For Test three

app.get('/test_three/:fruit/:cake', (req, res) => {
    const {fruit, cake} = req.params;

    if (req.headers.authorization !== "Bearer projecttwo") {
        return res.json({ message: "unauthorized" }).status(401)
    }

    res.json({
        message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`
    });

});

//For Test four

app.post('/test_four', (req, res) => {
    const{fruit, cake} = req.body;

    res.json({ message: `i am getting really sick of eating ${fruit} after filling up on ${cake}` });
    //This is very similar to test_two. Do not get confused, look at the curl command and how it is encoding the url.

});

//For test five Undone

app.put('/test_five/write', (req, res) => {
    const {fruit, cake} = req.body;

    const val1 = DATABASE.read(fruit); //Retrieve fruit value from database
    if (!val1) { // Check if undefined
        DATABASE.create(fruit, 1); //If undefined, then add value to data base, start on 1 
    } else {
        DATABASE.update(fruit, val1+1); //If it already exist, incremenet by 1
    }

    //Same stuff below
    const val2 = DATABASE.read(cake);
    if (!val2) {
        DATABASE.create(cake, 1);
    } else {
        DATABASE.update(cake, val2+1);
    }

    return res.json({
        message : `you sent ${fruit} and ${cake}`
    });
});

app.get('/test_five/read', (req, res) => {
    return res.json(JSON.parse(DATABASE.dump()));
});

app.get('/db/read', (req, res) => {
    res.json(DATABASE.data);
});

app.get('/db/write', (req, res) => {
    console.log(req.query);
    // DATABASE.insert(req.query.key, req.query.value);
    DATABASE.create(req.query.key, req.query.value);
    res.json(DATABASE);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));