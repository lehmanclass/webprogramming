const express = require('express');
const app = express();
app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.use(express.static('build'));

app.get("/anime_search", (req, res) => {
  var anime = req.body;
  console.log(anime)
  fetch(`https://private-anon-5c3bcd3da7-jikan.apiary-mock.com/v3/${anime}/episodes/1/`).then(body => {
    res.json({ results: JSON.parse(body) })
  }).catch(err => {
    console.log(err);
    res.json({ you: "fail" })
  });

});


const onListen = () => {
  console.log('i am listening');
}

app.listen(3000, onListen);