const express = require('express');
const app = express();
const getAPI = require('./helpers').getAPI;
const axios = require('axios');

const PORT = 3000;

app.use(express.static('build')); 
//Middleware, creates app.get behind the scenes. Makes each method its endpoint on the server/route. 
//Lets the html all the request it needs. It will server the last output of npm on build.
app.use(express.json());

app.post('/gif_search', (req, res) => {
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