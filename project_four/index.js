const express = require ('express');
const pg= require('pg');
const app=express();
var bodyParser = require('body-parser');


const db=new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database:'postgres',
    password: 'postgres',
    port:5432,
});
db.connect();
// app.use(express.static('build'));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  
app.post('/login', (req,res)=>{
  var username= req.body.username;
  var password = req.body.password;

    db.query(`SELECT * from log_in WHERE username='${username}', password='${password}'`, function(error,result)
    
    {
      if (username && password) {
        res.json(result.rows);
     }else{
      res.send(404);
     }


    } )
  

});






app.post('/new', (req, res) =>{
   

    const username= req.body.username;
    const password= req.body.password;
    const email = req.body.email;
 const query=  `INSERT INTO register_account (username, password, email) VALUES (username='${username}', password='${password}', email='${email}');`

  db.query(query, (error, result) => {
   // db.query('INSERT INTO register (username, password, email) VALUES (name, password, email)', [username, password, email], (error, result) => {
      if (error) {
        throw error
      }

      
      res.send(result.rows);
     // console.log("get it");
    })
  
//db.query(query).then(reult=>res.json(result.rows));

});




app.post('/paymentinfo', (req, res) =>{
   

    const { firstname} = req.body.firstname;
    
    const { lastname} = req.body.lastname;
    
    const { address} = req.body.address;
    
    const { cardnumber} = req.body.cardnumber;

     const { cvv} = req.body.cvv;

     const { exp} = req.body.exp;






    const query=  `INSERT INTO register_account (firstname,lastname,address,cardnumber,cvv,exp) VALUES (firstname='${firstname}', lastname='${lastname}', address='${address}',
     cardnumber='${cardnumber}' , cvv='${cvv}', exp='${exp});`

     db.query(query, (error, result) =>{
    //db.query('INSERT INTO payment (name, password, email) VALUES (req.body)', [ firstname, lastname, address, cardnumber,cvv, expdate], (error, result) => {
      if (error) {
        throw error
      }
      //res.status(201).send(`User added with ID: ${result.insertId}`)
      res.send(result.rows);
    })
  

});



app.listen(5000);