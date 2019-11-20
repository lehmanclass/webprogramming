const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const token = process.env.giphy;
console.log(token);
app.use(express.json());

app.use(express.static(path.join(__dirname, "./front_end/build")));

app.post("/gif_search", (req, res) => {
  const searchTerm = req.body.searchTerm;
  axios
    .get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${token}`)
    .then(response => {
      const gifs = response.data.data.map(gifInfo => {
        return {
          gifUrl: gifInfo.images.preview_gif.url,
          focusUrl: gifInfo.images.original.url,
          fixed_height: gifInfo.images.fixed_height_still.url,
          title: gifInfo.title,
          key: gifInfo.id
        };
      });
      res.json({ results: gifs });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log("server is running"));
