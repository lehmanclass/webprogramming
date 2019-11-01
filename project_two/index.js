const express = require("express");
const apply = require('./Mymodule');
const app = express();

app.use(express.json());




class fakeAssDatabase {
	constructor() {
		this.data = {};
	}

	create(keyString, valueNumber) {
		if (this.data[keyString]) {
			throw new Error(`${keyString} already exists!`);
		}
		this.data[keyString] = valueNumber;
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

MyfakeAssdatabase =new fakeAssDatabase();

console.log('MyfakeAssdatabase');






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
    if(apply.TokenAuthorization(req.headers)){
       res.json({ "message": `i am getting really sick of eating ${fruit} after filling up on ${cake}` })
    }else{
        res.json({ message: "unauthorized" });
    }
});


app.put("/test_five/write", (req,res)=>{
 
 
    const {fruit, cake } = req.body;

  MyfakeAssdatabase.create(fruit , 1);
  MyfakeAssdatabase.create(cake, 1);

  console.log(MyfakeAssdatabase);


 return res.json( { "message": `you sent ${fruit} and ${cake}`});
    
 });

   app.get ("/test_five/read", (req,res)=>{
    const {fruit, cake } = req.body;

    MyfakeAssdatabase.read(fruit ,1);
    MyfakeAssdatabase.rea(cake , 1);
  
    console.log(MyfakeAssdatabase);

        return res.json({"message":` "${fruit}": 1, "${cake}": 1 `})
});

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listen on port ${port}`))


