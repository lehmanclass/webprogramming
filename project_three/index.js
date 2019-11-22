const express = require('express');
const PORT = 3000;
const app = express();
const request = require('request-promise-native');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const makeGifSearch = (searchTerm) => {
    const token = process.env.GIPHY_API_TOKEN;
    console.log(token);

    const option ={
        url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${token}&limit=5`
    };

    return request(option).then(response =>{
        console.log(typeof response);
        const parsed = JSON.parse(response);
        const newImages = [];

        parsed.data.forEach(imageObject=> {
            const image = imageObject.images.original.url;
            newImages.push({giphy: image, focusUrl: image});
        });

        console.log(newImages);
        return newImages;
    });
};

app.use(express.static('build'));

app.post('/gif_search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    console.log('searchTerm', searchTerm);
    makeGifSearch(searchTerm).then((newImages) => {
        // sendResponse(); // this is not a real function name
        res.json(newImages);
    });
});

app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
