const express = require('express');
const bodyParser = require('body-parser');

const db = require(`./db.js`);

const app = express();



const PORT = 3000;

const TOKEN = 'projecttwo'
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const DATABASE = new FakeAssDatabase();
const DATABASE ={};



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


    return res.json(
        
        `{"message": {"i love to eat ${aFruit} with ${aCake}"}}`
    );


});


app.get('/test_three/:afruit/:acake',(req,res) => {

    const token = req.headers.authorization.replace('Bearer ', '');


    const acake = req.params.acake;
    const afruit = req.params.afruit;

    

    if (TOKEN !== token) {
        return res.json({ message: 'unauthorized' });

    }

    if(TOKEN === token){

        return res.json({ message : `you sent ${afruit} and ${acake}, but I only eat ${acake}!`})
    }


});


app.post('/test_four',(res,req) =>{

    const afruit = req.body.fruit;
    const cake = req.body.cake; 




    res.json({ message: `i am getting really sick of eating ${afruit} after filling up on ${cake}` });


});



app.put('test_five/write',(res,req) => {

});

app.get('test_five/read',(res,req) => {

});

app.get('test_five/read?fruit=${aSecondFruit}&cake=${aCake}',(res,req) => {

});











app.listen(PORT,() => console.log(`listening on port ${PORT}`));