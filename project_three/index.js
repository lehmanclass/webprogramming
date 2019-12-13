const express = require('express');
const app = express();
app.use(express.json());

const rp = require('request-promise-native');

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

app.post("/gif_search", (req, res) => {
    const search = req.body;
    console.log(search)
    rp(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=twhuIjVWibS1B9BZvdIp71yjIHsYoj5I&limit=5`).then(body => {
        //const data = body;
        // console.log(data)
        const parsed = JSON.parse(body);
        var mod = parsed.data
        var mod2 = mod.map(mod => ({gifUrl: mod.images.original.url, focusUrl:mod.images.downsized_large.url }))
        //mod = mod.map(mod => mod.images.downsized_large.url)

        //console.log(mod)
        res.json({ results:mod2})
    }).catch(err => {
        console.log(err);
        res.json({you:"fail"})
    });
    
});


const onListen = () => {
    console.log('i am listening');
}

app.listen(3000, onListen);