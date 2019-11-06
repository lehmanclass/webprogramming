
const express = require('express');
const bodyParser = require('body-parser');
const FakeAssDatabase = require('./fakedata') ;
const DB = new FakeAssDatabase();


const app = express();


const PORT = 3000;

const TOKEN = 'projecttwo'

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//				~~~~~~~			test one		~~~~~~~		

app.get('/test_one', (request, response) => {
    const { fruit , cake} = request.query;

    response.json({
        message: {
            fruit,
            cake
        }
    });
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

app.put('/test_five/write', (request,response) => {
    const {fruit, cake} = request.body;

    const dataFruit = DB.read(fruit);
    if(!dataFruit) {
        DB.create(fruit, 1);
        } else {
             DB.update(fruit, dataFruit + 1);
        }

    const dataCake = DB.read(cake);
    if(!dataCake) {
        DB.create(cake, 1);
        } else {
             DB.update(cake, dataCake + 1);
        }

     response.json({ message: `you sent ${fruit} and ${cake}` });


});

app.get('/test_five/read',(request, response) => {
  response.json(JSON.parse(DB.dump()));

});


//				~~~~~~~							~~~~~~~		
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
