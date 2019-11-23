
// const request = require('request-promise-native');

// const makeGifSearch = (searchTerm) => {
//     const token = process.env.GIPHY_API_TOKEN;
//     console.log(token);

//     const option ={
//         url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${token}&limit=5`
//     };

//     request(option).then(response =>{
//         console.log(typeof response);
//         const parsed = JSON.parse(response);
//         const newImage = [];

//         parsed.data.forEach(imageObject=> {
//             const image = imageObject.images.original.url;
//             newImage.push({giphy: image, focusUrl: image});
//         });
//         console.log(newImage);
//     });
// };