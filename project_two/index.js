const express = require('express');
const bodyParser = require('body-parser');
const FakeAssDatabase = require('./database.js');
const app = express();
const DATABASE = new FakeAssDatabase();
const PORT = 3000;
const TOKEN = 'projecttwo'
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/test_one', (req, res) => {
    const { fruit , cake} = req.query;
    return res.json({
        message: {
            fruit,
            cake
        }
    });
   
});
app.post('/test_two', (req,res) => {
   const aFruit = req.body.fruit;
   const aCake = req.body.cake;
    return res.json({ message:`i love to eat ${aFruit} with ${aCake}`});
});
app.get('/test_three/:afruit/:acake',(req,res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const acake = req.params.acake;
    const afruit = req.params.afruit;
    
    if (TOKEN !== token) {
        return res.json({ message: 'unauthorized' });
    }
    if(TOKEN === token){
        return res.json({ message :`you sent ${afruit} and ${acake}, but I only eat ${acake}!`})
    }
});
app.post('/test_four',(req,res) => {
    const aFruit = req.body.fruit;
    const aCake = req.body.cake; 
    res.json({ message: `i am getting really sick of eating ${aFruit} after filling up on ${aCake}` });
});

app.put('/test_five/write', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    try{
    
    DATABASE.create(fruit, 1);
    }
    catch{
    DATABASE.update(fruit, DATABASE.read(fruit) + 1);
    
    }
    try{
    
    DATABASE.create(cake, 1);
    }
    catch{
    DATABASE.update(cake, DATABASE.read(cake) + 1);
    
    }
    res.json({
    message: 'you sent ' +  fruit  + ' and ' + cake
    })
    
    })
    
    app.get('/test_five/read', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    res.json(
    DATABASE.data
    )
    })
    



app.listen(PORT,() => console.log(`listening on port ${PORT}`));



