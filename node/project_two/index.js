
const express = require('express');
const app = express();

const jsonMiddleware = express.json();

const PORT = 3000;

const TOKEN = 'projecttwo'

app.use(jsonMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//				~~~~~~~			test one		~~~~~~~		

app.get('/test_one', (request, response) => {
	const { fruit, cake } = request.query;
	response.json(`message: fruitMessage: ${fruit}, cakeMessage: ${cake}`);

});

//				~~~~~~~			test two		~~~~~~~	

app.post('/test_two', (request, response) => {
    const {fruit, cake} = request.body;

    response.json({
        message: `i love to eat ${fruit} with ${cake}`
    });
});




//				~~~~~~~			test three		~~~~~~~		

app.get('/test_three/:fruit/:cake',(request, response) => {

  const {fruit, cake} = request.params;

    if (request.headers.authorization !== "Bearer projecttwo") {
        return response.json({ message: "unauthorized" }).status(401)
    }

    response.json({
        message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`
    });
  });

//				~~~~~~~			test four		~~~~~~~		
app.post('/test_four', (request, response) => {
    const{fruit, cake} = request.body;

    response.json({ message: `i am getting really sick of eating ${fruit} after filling up on ${cake}` });

});


//				~~~~~~~			test five		~~~~~~~			








//				~~~~~~~							~~~~~~~		
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
