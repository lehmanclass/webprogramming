const express = require("express");

const jsonMiddleware = express.json();

const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

const TOKEN = 'projecttwo';
const FakeDatabase = require('./Database.js');

const DATABASE = new FakeDatabase();

app.use(bodyParser.urlencoded({extended: true}));

app.use(jsonMiddleware);


app.get('/test_one', (req, res) => {
   
  const { fruit, cake} = req.query;
   
  return res.json({
     message: {
       fruit,
       cake
     }
   });
  });

  app.post('/test_two', (req, res) => {
    const body = req.body;

    var aFruit = body.fruit;
    var aCake = body.cake;

    return res.json({ message: "i love to eat " + aFruit + " with " +aCake });  
    });

   app.get('/test_three/:fruit/:cake', (req, res) => {
  
    const token = req.headers.authorization.replace('Bearer ', '');

        if (TOKEN !== token) {
                return res.json({ message: 'unauthorized' });
        }
        return res.json({ message: "you sent " + req.params.fruit + " and " + req.params.cake +  
        " but I only eat " + req.params.cake + "!" });
        });
        
      
    app.post('/test_four', (req, res) => {
      return res.json({ message: "I am getting really sick of eating " +req.body.fruit +
       " after filling up on " + req.body.cake});  
      
      });
      app.put('/test_five/write', (req, res) => {
        const {fruit, cake} = req.body;
    
        const aFruit = DATABASE.read(fruit); 
        if (!aFruit) {
            DATABASE.create(fruit, 1); 
        } else {
            DATABASE.update(fruit, aFruit+1); 
        }
    
        
        const aCake = DATABASE.read(cake);
        if (!aCake) {
            DATABASE.create(cake, 1);
        } else {
            DATABASE.update(cake, aCake+1);
        }
    
        return res.json({
            message : `you sent ${fruit} and ${cake}`
        });
    });
    
    app.get('/test_five/read', (req, res) => {
        return res.json(JSON.parse(DATABASE.dump()));
        res.json(DATABASE.data);
    });
    
    app.get('/Database/read', (req, res) => {
        res.json(DATABASE.data);
    });
    
    app.get('/Database/write', (req, res) => {
        console.log(req.query);
          DATABASE.create(req.query.key, req.query.value);
        res.json(DATABASE);
    });


const onListen = () => {
    console.log("I am listening");
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
