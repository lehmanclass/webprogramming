const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
const PORT = 5000;

app.use(express.json());
const api_key = process.env.GIPHY_API_TOKEN;

app.use(express.static("build"));

app.post("/gif_search", (req, res) => {
  const { searchTerm } = req.body;
  axios
    .get(
      `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${api_key}&limit=5`
    )
    .then(resp => {
      const results = resp.data.data.map(gif => {
        return {
          gifUrl: gif.images.original.url,
          focusUrl: gif.images.downsized_large.url
        };
      });
      res.json({ results });
    })
    .catch(() => res.json({ msg: "Failed" }));
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
