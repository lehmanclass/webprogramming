
const express = require('express');
const app = express();
const jsonMiddleware = express.json();
const PORT = 3000;
//const DEFAULT_TOKEN = 'thisismytoken';


app.use(jsonMiddleware);

// --------> 

app.get('/test_one', (request, response) => {
    const { fruit, cake } = request.query;

    response.json(`message: fruitMessage: ${fruit}, cakeMessage: ${cake}`);
    
});

// -------->

const test_two = (request, response) => {

    if (request.originalUrl !== '/test_two') {
        response.send('You did something wrong');
    }
    else{
        if (request.headers['content-type'] === 'application/json'){
            const fruit = request.body[`fruit`];
            const cake = request.body[`cake`];

            response.json(`message: I love to eat: ${fruit}, with: ${cake} `);
        }
    }
};


// --------->

// test 3 

// --------->

// test 4

// --------->

// test 5

// ---------------->
// running 

app.post('/test_two', test_two);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));