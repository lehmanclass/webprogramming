const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const TOKEN = 'projecttwo';

// app.use(jsonMiddleware);

const fakeAssDatabase = {
    "johnny.mccodes@cuny.edu": 1
};

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
    const message = {"message": "I love to eat "+req.body.fruit+" with "+req.body.cake}
    res.json(message)
});

app.get('/test_three/:grape/:angelfood', (req, res) =>{
    console.log('headers ->', req.headers);
    console.log('req.body ->', req.body);

    const token = req.headers.authorization.replace('Bearer ', '');

    if (TOKEN !== token) {
        return res.json({ message: 'unauthorized' });
    }
    return res.json({ message: `You sent ${req.params.grape} and ${req.params.angelfood}, I only eat ${req.params.angelfood}`});
});

app.get('/test_four', (req, res) =>{
    console.log('headers ->', req.headers);
    console.log('req.body ->', req.body);
    return res.json({ message: `You sent ${req.body.fruit} and ${req.body.cake}`});
});



app.listen(PORT,()=>console.log("server is running"));