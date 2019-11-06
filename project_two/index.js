const express = require('express'); 
const FakeDatabase = require('./db.js');
const app = express();

const PORT = 3000;

const DATABASE = new FakeDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Section One

app.get(`/test_one`, (req, res) => {
    const { fruit, cake } = req.query; //

    res.json({
        message: {
            fruit,
            cake
        }
    });
});

//Section Two

app.post('/test_two', (req, res) => {
    const {fruit, cake} = req.body;

    res.json({
        message: `i love to eat ${fruit} with ${cake}`
    });
});

//Section Three

app.get('/test_three/:fruit/:cake', (req, res) => {
    const {fruit, cake} = req.params;

    if (req.headers.authorization !== "Bearer projecttwo") {
        return res.json({ message: "unauthorized" }).status(401)
    }

    res.json({
        message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`
    });

});

//Section Four

app.post('/test_four', (req, res) => {
    const{fruit, cake} = req.body;

    res.json({ message: `i am getting really sick of eating ${fruit} after filling up on ${cake}` });
});

//Section Five

app.put('/test_five/write', (req, res) => {
    const {fruit, cake} = req.body;

    const fruitVal = DATABASE.read(fruit);
    if (!fruitVal) { 
        DATABASE.create(fruit, 1);
    } else {
        DATABASE.update(fruit, fruitVal+1);
    }

    const cakeVal = DATABASE.read(cake);
    if (!cakeVal) {
        DATABASE.create(cake, 1);
    } else {
        DATABASE.update(cake, cakeVal+1);
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
    DATABASE.create(req.query.key, req.query.value);
    res.json(DATABASE);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));