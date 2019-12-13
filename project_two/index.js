const express = require ('express');

const app = express();

const TOKEN = 'projecttwo';

app.use(express.json());
app.use(express.urlencoded());



const PORT = 3000;

app.get('/test_one', (req, res) => {
    let fruit = req.query.fruit;
    let cake = req.query.cake;

    let jsonObj = { message: { fruit: `${fruit}`, cake: `${cake}`} };
    res.send(jsonObj);
});

app.post('/test_two', (req, res) =>{
    let aFruit = req.body.fruit;
    let aCake = req.body.cake;
    let jsonObj = { message: `i love to eat ${aFruit} with ${aCake}`  };
    res.send(jsonObj);
    
    });
app.get('/test_three/:aFruit/:aCake', (req, res) =>{
    let aFruit = req.params.aFruit;
    let aCake = req.params.aCake;
    const token = req.headers.authorization.replace('Bearer ', '');

    if (TOKEN !== token) {
        return res.json({ message: 'unauthorized' });
    } else{
    
        let jsonObj = { message: `you sent ${aFruit} and ${aCake}, but I only eat ${aCake}!`}
    res.send(jsonObj);
   
    }


});

app.post('/test_four', (req,res) =>{
    let aFruit = req.body.fruit;
    let aCake  = req.body.cake;
    let jsonObj = { message: `i am getting really sick of eating ${aFruit} after filling up on ${aCake}` }
    res.send(jsonObj);

});
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
let p = new FakeAssDatabase;


app.put('/test_five/write',(req,res) =>{

    let fruit = req.body.fruit;
    let cake = req.body.cake;
    
    try {
        p.create(fruit, 1);
    } catch (e) {
        p.update(fruit, p.read(fruit) + 1);
    } try {
        p.create(cake, 1);
    } catch (e) {
        p.create(cake, p.read(cake + 1));
    }

 
 jsonObj = {message:`you sent ${fruit} and ${cake}`};
 res.send(jsonObj);

});
app.get('/test_five/read', (req, res) => {

 res.json(p.data);
});

app.listen(PORT, () => console.log(`project_two running${PORT}!`));
