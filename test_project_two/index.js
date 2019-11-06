var express = require('express');
var app = express();
const jsonMiddleware = express.json();
const TOKEN = 'projecttwo';
const PORT=3000;
app.use(express.json());
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const database= require('./database');
const fakedatabase= new  database();

app.get('/test_one',(req, res)=> {
   const {fruit, cake}=req.query;


 return res.json({
     messaage:{
         fruit, 
         cake
     }
 });

});





app.post('/test_two',(req, res)=> {
    
    
    const aFruit= req.body.fruit;
    const aCake=req.body.cake;
    
    
 return res.json(
    `{ "message": { "I love ${aFruit} with ${aCake}" }}`
       
        
    );

    });
    


    app.get('/test_three/:aFruit/:aCake',(req, res) => {
        
       
        console.log('headers ->', req.headers);
        

       const aFruit= req.params.aFruit;
       const aCake=req.params.aCake;
          
    
    const token = req.headers.authorization.replace('Bearer ','');
    
    
        if (TOKEN === token) {

            return res.json( 
                `{ "message": { "you sent ${aFruit} and ${aCake}, but I only eat ${aCake}!" }}`
                 );
             
        }
        else{
            return res.json( `{ "message": { "unauthorized" }}`); 
        }
    
    });
    app.post('/test_four',(req, res)=> {
    
       console.log('headers ->', req.headers);
    
       const aFruit= req.body.fruit;
       const aCake=req.body.cake;

      
    
     
      

      return res.json( `{ "message": {"i am getting really sick of eating ${aFruit} after filling up on ${aCake}" }}`)



      
    });

        


     app.put('/test_five/write', (req,res) => {
        const fruit = req.body.fruit;
        const cake = req.body.cake;
        
        try{
        
            fakedatabase.create(fruit, 1);
        }
        catch{
            fakedatabase.update(fruit,  fakedatabase.read(fruit) + 1);
            
        
        }
        try{
        
            fakedatabase.create(cake, 1);
        }
        catch{
            fakedatabase.update(cake,  fakedatabase.read(cake) + 1);
        
        }
        res.json({
        message: ' you sent ' + fruit  + ' and ' + cake
        })
        
        })
        
        app.get('/test_five/read', (req,res) => {
        const fruit = req.body.fruit;
        const cake = req.body.cake;
        
        res.json(
            fakedatabase.data
        )
        })
        
      
     


app.listen(PORT,()=> console.log(`listening on port ${PORT}`));

