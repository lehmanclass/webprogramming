// import { get } from "https";

const express = require('express');
const request = require('request-promise-native');

const app = express(); 

// app.get('/', (req , res) => {
//     const name = req.query.name;
//     return res.send('sup ${name}')

// });

// app.get('/say_hello/:fruit', (req, res) => {
//     const fruit = req.params.fruit;
//     return res.send('sup i like to eat ${fruit}')

// });

app.get('/where_is_the_iss', (req, res)) => {

    const issUrl = 'http://api.open-notify.org/iss-now.json';

    const options = {
        uri: issUrl
    };
    
    request(options).then((response) => {
        const json = response.toString();
        console.log(json);
        res.send(json);

    });

});

app.get();

app.listen(3000, () => console.log('listening'));