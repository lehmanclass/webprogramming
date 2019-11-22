const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 5000;
const path = require('path');

app.use(express.json());

//const APIKEY = process.env.GIPHY_API_TOKEN;
const APIKEY = "FD72StcwtexUj9FHhzMkpP0DK5WWtaSq";
app.use(express.static(path.join(__dirname, "./build")));


app.post('/gif_search', (req, res) => {
	const { searchTerm } = req.body;

	axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${APIKEY}&limit=5`)
	.then(resp =>{

		const results = resp.data.data.map(gif =>{
			return {
				gifUrl: gif.images.original.url,
				focusUrl: gif.images.downsized_large.url
			}
		})
		res.json({results});
	})
	.catch(() => res.json({ msg: 'Failed' }));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));