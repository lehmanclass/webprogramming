//Shany M. Lajara Contreras


const express = require('express');
const app = express();
const jsonMiddleware = express.json();
const PORT = 3000;

const myToken = 'projecttwo';
app.use(jsonMiddleware);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const FakeAssDatabase = require('./db.js');
const mydb = new FakeAssDatabase();


// --------> 
// ------------------> TEST ONE <-----------------------------------
// --------> 
// --------> COMMAND  --------> 
// --------> 
//When I send a GET request to localhost:3000/test_one?fruit=${fruit}&cake=${cake} 
//i should get back: { "message": { "fruit": "${fruit}", "cake": "${cake}" } }
// --------> 

app.get('/test_one', (request, response) => {
    const { fruit, cake } = request.query;

    response.json(`"/message:"/ fruit: ${fruit}, cake: ${cake}`);
    
});



// -------->
// -----------------------------------> TEST TWO <-----------------------------------
// --------->
//given this JSON body: { "fruit": "${aFruit}", "cake": "${aCake}" }
//and given the correct headers
//When I send a POST request to localhost:3000/test_two, 
//the headers from previous step, and the body from the previous step, 
//i should get back: { "message": "i love to eat ${aFruit} with ${aCake}" }

// --------->
// --------->

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
// ----------------------------------> TEST THREE <-----------------------------
// --------->
//Given a a header of Authorization: Bearer projecttwo
//When I send a GET request to localhost:3000/test_three/${aFruit}/${aCake}, 
//with the above headers, i should get back: { "message": "you sent ${aFruit} and ${aCake}, but I only eat ${aCake}!" }
//If I send an incorrect token in the headers, i should get: { "message": "unauthorized" }
// --------->

app.get('/test_three/:fruit/:cake', (req, res) => {


        const { fruit, cake } = req.params;
        const token = req.headers.authorization.replace('Bearer ', '');
    
        if (token === myToken) {
            res.send(` message: you sent ${fruit} and ${cake}, but I only eat ${cake}!" `);
        } else {
            res.send('Message: unauthorized ');
        }
        
    });


// --------->
// ----------------------------------> TEST FOUR <-----------------------------
// --------->
// given this form body: "fruit=${aFruit}&cake=${aCake}"
//and given the correct headers
//When I send a POST request to localhost:3000/test_four, 
//the headers from previous step, and the body from the previous step, 
//i should get back: { "message": "i am getting really sick of eating ${aFruit} after filling up on ${aCake}" }
// --------->

const test_four = (request, response) => {

        if (request.originalUrl === '/test_four') {
            if (request.headers['content-type'] === 'application/x-www-form-urlencoded'){
                const fruit = request.body[`fruit`];
                const cake = request.body[`cake`];
                response.json(`message: I am getting really sick of eating ${fruit} after filling up on ${cake}`);
            }
            else{
                response.send('You did something wrong');
            }
        }
        else{
        response.send('You did something wrong');
        }
    };
    
    app.post('/test_four', test_four);

// --------->
// ----------------------------------> TEST FIVE<-----------------------------
// --------->
//given this json body: "{ "fruit": ${aFruit}, "cake": ${aCake}"
//and given the json content headers
//When I send a PUT request to localhost:3000/test_five/write, the headers from previous step, and the body from the previous step, i should get back: { "message": "you sent ${aFruit} and ${aCake}" }
//If I then send a GET request to localhost:3000/test_five/read I get back: { "${aFruit}": 1, "${aCake}": 1 }
//If I send the same PUT request again, with new body: "{ "fruit": ${aSecondFruit}, "cake": ${aCake}"
//If I send a GET request to localhost:3000/test_five/read?fruit=${aSecondFruit}&cake=${aCake} a second time, I get back: { "${aFruit}": 1, "${aSecondFruit}": 1, ${aCake}": 2 }
// --------->


app.put('/test_five/write', (req,res) => {
    const {fruit, cake} = req.body;
    
    let fruitdb = mydb.read(fruit);
            if(!fruitdb) {
                mydb.create(fruit, 1);
            } else {
                mydb.update(fruit, fruitdb + 1);
            }
  
    let cakedb = mydb.read(cake);
            if(!cakedb) {
                mydb.create(cake, 1);
        
            } else {
                mydb.update(cake, cakedb + 1);
            }
    res.json({ message: `you sent ${fruit} and ${cake}` });
  
  
  });
  
  app.get('/test_five/read',(req, res) => {
    res.json(JSON.parse(mydb.dump()));
  
  });

// --------->
// ---------> the end
// --------->

app.post('/test_two', test_two);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
