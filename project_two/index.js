const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());



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


``


app.listen(PORT,() => console.log(`listening on port ${PORT}`));