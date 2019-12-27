const axios =  require('axios');
const secret_key =  require('./mykey.js');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('build'));
app.use(express.json());

app.post('/gif_search', (req, res) => {

const { searchTerm } = req.body;

axios.get('http://api.giphy.com/v1/gifs/search?q='+searchTerm+`&api_key=${secret_key}&limit=5`)
    .then(response => {
        const results = response.data.data.map(gif_img => ({
            gifUrl: gif_img.images.original.url,
            focusUrl: gif_img.images.downsized_large.url
        }));
        res.json({results});

    })
    .catch(() => res.json({msg: 'FAILED'}));
});


app.listen(PORT, () => console.log(`Hey!!  I am listening on port ${PORT}!`));