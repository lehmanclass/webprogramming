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
const fakedata= new  database();

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

        
    app.put('/test_five/write',(req, res)=> {
    
        let n = 0;
       
     
        const aFruit= req.body.fruit;
       const aCake=req.body.cake;
         


      fakedata.create(aFruit, n+1) 
       fakedata.create(aCake, n+1)

 
       return res.json( `{ "message": {"You sent ${aFruit} and ${aCake}" }}`)
 
     });
     app.get('/test_five/read',(req, res)=> {

        const aFruit = req.body.fruit;
       const aCake  =req.body.cake;
         let n=0;
        try{
            if(fakedata.read(fruit)==fruit){
                fakedata.update(aFruit, n+1)
            }

        }
        catch(e){
            console.log(e);

        }
       
        res.json(fakedata.data);
         
        return res.json( `{ "message": {"You sent ${aFruit} : ${number} and ${aCake}" }}`)

     });

app.listen(PORT,()=> console.log(`listening on port ${PORT}`));

