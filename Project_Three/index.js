//const path = require('path');
const express = require('express');
const app = express();
const getAPI = require('./helpers').getAPI;
const axios = require('axios');

const PORT = 3000;



app.use(express.static('build')); 

app.use(express.json());

app.post('/find', (req, res) => {
    let { searchTerm } = req.body;

    axios.get(getAPI(searchTerm))
        .then(data => {

            let results = data.data.data.map(gif => ({
                gifUrl: gif.images.original.url,
                focusUrl: gif.images.downsized_large.url,
            }));

            res.json({results});
        })
        .catch((err) => res.json({msg: err.message}));
});



app.listen(PORT, ()=> console.log(`listening on ${PORT}`)); 