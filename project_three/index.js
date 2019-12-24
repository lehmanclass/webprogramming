const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;

app.use(express.json());
const APIKEY = require('./myapikey');

app.post('/gif_search', (req, res) => {
	const { searchQuery } = req.body;

	axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${APIKEY}&limit=5`)
	.then(resp => {

		const results = resp.data.data.map(gif => {
			return {
				gifUrl: gif.images.original.url,
				focusUrl: gif.images.downsized_large.url
			}
		})
		res.json({results});
	})
	.catch(() => res.json({ msg: 'Failed. No gifs for you.' }));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));



