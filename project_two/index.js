var express = require('express');
var app = express()
const PORT = 3000;
app.use(express.json);
var bodyParser = require('body-parser');

app.get('/test_one',(req, res)=> {
    const {fruit, cake}=req.query;
 
 
  return res.json({
      messaage:{
          fruit, 
          cake 
      }
  });
 
 });
//testing
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


    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());           
    app.post('/test_four',(req, res)=> {
    
       console.log('headers ->', req.headers);
    
       const aFruit= req.body.fruit;
       const aCake=req.body.cake;

      return res.json( `{ "message": {"i am getting really sick of eating ${aFruit} after filling up on ${aCake}" }}`)

    });


     class FakeAssDatabase {

        constructor() {
            this.data = {};
        }
    
        create(keyString, valueString) {
            if (this.data[keyString]) {
                throw new Error(`${keyString} already exists!`);
            }
            this.data[keyString] = valueString;
        }
    
        read(keyString) {
            return this.data[keyString];
        }
    
        update(keyString, valueString) {
            if (!this.data[keyString]) {
                throw new Error(`${keyString} does not exist!`);
            }
            this.data[keyString] = valueString;
        }
    
        delete(keyString) {
            if (!this.data[keyString]) {
                throw new Error(`${keyString} does not exist!`);
            }
            delete this.data[keyString];
        }
    
        dump() {
            return JSON.stringify(this.data);
        }
    
    
    }

    app.put('/test_five/write',(req, res)=> {
    
        console.log('headers ->', req.headers);
        let n = 0;
        let n1 = 0;
     
        const aFruit= req.body.fruit;
        const aCake=req.body.cake;


        create(aFruit, n = n+1) ;
        create(aCake, n1 = n1+1);
       

 
       return res.json( `{ "message": {"You sent ${aFruit} and ${aCake}" }}`)
 
     });


 app.listen(PORT,()=> console.log(`listening on port ${PORT}`));