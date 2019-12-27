// import { get } from "https";

const express = require('express');

const request = require('request');

const app = express(); 


app.get('/where_is_the_iss', (req, res) => { 

    const issUrl = 'http://api.open-notify.org/iss-now.json';
    
    // const options = {
    //     uri = issUrl
    // };

    const options = {
        uri: issUrl
    };

    request(options).then((response) => {
        const json = response.toString();
        console.log(json);
        res.send(json);
    });
});

const db = {
    users: ['johnny', 'martha'], 
    fruits: ['mango', 'fruits']

};


app.get('/users/read', (req, res) => res.json(db.users));

app.get('/fruits/read', (req, res) => res.json(db.fruits));

// app.get('', () => {
//     res.json()

// });
app.get('/fruits/append', (req, res) => {
    return res.json(db.fruits);
});

app.listen(3000, () => console.log('listening'));






