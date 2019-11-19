const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.post("/gif_search", (req, res) => {
  const searchTerm = req.body.searchTerm;
  axios
    .get(
      "http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm +
        "&api_key=n5v0ys2kC8OaWWwSg4chpqA837dlrHZs"
    )
    .then(response => {
      const gifs = response.data.data.map(gifInfo => {
        return {
          gifUrl: gifInfo.images.preview_gif.url,
          focusUrl: gifInfo.images.fixed_width_still.url,
          fixed_height: gifInfo.images.fixed_height_still.url,
          title: gifInfo.title,
          key: gifInfo.id
        };
      });
      res.json({ result: gifs });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3001, () => console.log("server is running"));
