const axios =  require('axios');
const cors =  require('cors');
const TOKEN_API =  require('./myapikey');
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('build'));
app.use(express.json());

app.use(cors());

app.post('/gif_search', (req, res) => {
    const { searchTerm } = req.body;

    axios.get('http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key='+TOKEN_API+'&limit=5')

    .then(response => {
        const results = response.data.data.map(img => ({
            gifUrl: img.images.original.url,
            focusUrl: img.images.downsized_large.url
        }));
        res.json({results});

    })
    .catch(() => res.json({msg: 'FAILED'}));
});


app.listen(PORT, () => console.log(`Hey!!  I am listening on port ${PORT}!`));


