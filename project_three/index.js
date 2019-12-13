
const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;
require('dotenv').config()

app.use(express.static('build'));
app.use(express.json());
const api_key = process.env.API_TOKEN;
app.post('/gif_search', (req, res) => {
    let { searchTerm } = req.body;

    axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${api_key}&limit=5`)
        .then(data => {

            let results = data.data.data.map(gif => ({
                gifUrl: gif.images.original.url,
                focusUrl: gif.images.downsized_large.url,
            }));

            res.json({ results });
        })
        .catch((e) => res.json({ msg: e.message }));
});
app.listen(PORT, () => console.log(`listening on ${PORT}`)); 