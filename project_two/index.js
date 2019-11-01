const express = require("express");
const apply = require('./Mymodule');
const app = express();

app.use(express.json());
app.use(express.urlencoded());





class FakeAssDatabase {

    constructor() {
        this.data = {};
    }

    create(keyString, valueString) { // OOPS - the value should be a number
        if (this.data[keyString]) {
            throw new Error(`${keyString} already exists!`);
        }
        this.data[keyString] = valueString;
    }

    read(keyString) {
        return this.data[keyString];
    }

    update(keyString, valueString) { // public service announcement - value is a number
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
const data = new FakeAssDatabase();



//console.log('MyfakeAssdatabase');






app.get("/test_one", (req, res) => {
  const message = {
    message: {
      fruitMessage: req.query.fruit,
      cakeMessage: req.query.cake
    }
  };
  res.json(message);
});

app.post("/test_two", (req, res) => {
  const { fruit, cake } = req.body;
  res.json({
    massage: { fruitMessage: `i love to eat ${fruit} with ${cake}` }
  });
});

app.get("/test_three/:fruit/:cake", (req, res) => {
  const { fruit, cake } = req.params;
  TokenAuthorization(req.headers)
    ? res.json({ message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`})
    : res.json({ message: "unauthorized" });
});

app.post("/test_four", (req, res) => {
    const { fruit, cake } = req.body;
    res.json({ message: `i am getting really sick of eating ${fruit} after filling up on ${cake}`
    });
  });




// app.put("/test_five/write", (req,res)=>{
//   const {fruit, cake } = req.body;

//   MyfakeAssdatabase.create(fruit , 1);
//   MyfakeAssdatabase.create(cake, 1);

//   console.log(MyfakeAssdatabase);


//  return res.json( { "message": `you sent ${fruit} and ${cake}`});
    
//  });


//     app.get('/test_five/read', (req,res) => {
//         const fruit = req.body.fruit;
//         const cake = req.body.cake;
        
//         res.json(
//             data.data
//         )
//     })

 
 






app.put('/test_five/write', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    try{
        data.create(fruit, 1);
    }
    catch{
        data.update(fruit, data.read(fruit) + 1);
    }
    try{
        data.create(cake, 1);
    }
    catch{
        data.update(cake, data.read(cake) + 1);
    }
    res.json({
        message: ' you sent ' + fruit  + ' and ' + cake
    })
    
});
    
app.get('/test_five/read', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    res.json(
        data.data
    )
})
    
app.put('/test_five/write', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    
    res.json({ message: `i am getting really sick of eating ${fruit} after filling up on ${cake}`});
    
})
    
app.get('/test_five/read/:fruit/:cake', (req,res) => {
    const fruit = req.body.fruit;
    const cake = req.body.cake;
    try{
        data.create(fruit, 1);
    }
    catch{
        data.update(fruit, fruit + 1);
    
    }
    try{
        data.create(cake, 1);
    }
    catch{
        data.update(cake, 1);
    
    }
    res.json(data.data)
})



const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listen on port ${port}`))


