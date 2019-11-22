const express = require('express');
const bodyparser = require('body-parser');
const API_KEY = require('./api_key');
const axios = require('axios');
const app = express();
const PORT = 5000;



app.use(express.json());
app.use(bodyparser.json());
app.post('/gif_search', (req, res) => {
    const  {searchTerm}  = req.body;
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=5`)
    .then(giphyResult => {
        const results = giphyResult.data.data.map(giphy => {
            return {
                gifUrl: giphy.images.original.url,
                focusUrl: giphy.images.downsized_large.url
            }
        })
        res.json({results})
    })
    .catch(() => res.json({message: 'could not get giphy'}));
});
app.listen(PORT,() => console.log(`listening on port ${PORT}`));
