var express = require('express');
var FakeAssDatabase = require('./db.js') ;
var app = express(); 

const DATABASE = new FakeAssDatabase(); 

const PORT = 3000;
const TOKEN = 'projecttwo';

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Test ONE:
app.get('/test_one', function (req, res) {
  const { fruit, cake } = req.query
  
  res.json({
    message: {

      fruit,
      cake
    }
  })
});

//Test TWO://
app.post('/test_two',(req, res) => {
  const { fruit, cake } = req.body

  return res.json({
     message: `i love to eat ${fruit} with ${cake}`});

});

//Test THREE://
app.get('/test_three/:fruit/:cake',(req, res) => {

  const {fruit, cake} = req.params;

  console.log(req.headers.authorization);
  const token = req.headers.authorization.replace('Bearer ', '');
  //const token = req.headers.authorization;
  
  if(TOKEN === token) {
    return res.json({message:`you sent ${fruit} and ${cake}, but I only eat ${cake}!`});
  }

  res.json({ message: "unauthorized" });
});

//Test FOUR://
app.post ('/test_four', (req,res) => {
  const {fruit, cake} = req.body;

  return res.json({
    message: `i am getting really sick of eating ${fruit} after filling up on ${cake}`});

});


//Test FIVE://
app.put('/test_five/write', (req,res) => {
  const {fruit, cake} = req.body;
  
  var readDatabaseFruit = DATABASE.read(fruit);
  if(!readDatabaseFruit) {
    DATABASE.create(fruit, 1);
  } else {
    DATABASE.update(fruit, readDatabaseFruit + 1);
  }

  var readDatabaseCake = DATABASE.read(cake);
  if(!readDatabaseCake) {
    DATABASE.create(cake, 1);

  } else {
    DATABASE.update(cake, readDatabaseCake + 1);
  }
  res.json({ message: `you sent ${fruit} and ${cake}` });


});

app.get('/test_five/read',(req, res) => {
  res.json(JSON.parse(DATABASE.dump()));

});



app.listen(PORT, () => console.log(`I AM LISTENING on ${PORT}`));
console.log('Server started! At http://localhost:' + PORT);

