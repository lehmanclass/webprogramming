const request = require('request-promise-native');

const option ={
    url: `http://api.giphy.com/v1/gifs/search?q=kitten$api_key=${process.env.TOKEN}&limit=5`
};

request(option).then(request=>{
    console.log(typeof Response);
    const parsed = JSON.parse(Response);
    const newImage = [];

    parsed.data.forEach(imageObject=> {
        const image = imageObject.image.original.url;
        newImage.push({giphy: image, focusUrl: image});
    });

    res.json(newImage);
})