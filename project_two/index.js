const express = require("express");
const helpers = require('./utils');
const app = express();

app.use(express.json());

app.get("/test_one", (req, res) => {
  const message = {
    message: {
      fruitMessage: req.query.fruit,
      cakeMessage: req.query.cake
    }
  };
  res.json(message);
});

app.post("/test_two", (req, res) => {
  const { fruit, cake } = req.body;
  res.json({
    massage: { fruitMessage: `i love to eat ${fruit} with ${cake}` }
  });
});

app.get("/test_three/:fruit/:cake", (req, res) => {
  const { fruit, cake } = req.params;
  isAuthorized(req.headers)
    ? res.json({ message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`})
    : res.json({ message: "unauthorized" });
});

app.post("/test_four", (req, res) => {
    const { fruit, cake } = req.body;
    if(helpers.isAuthorized(req.headers)){
       res.json({ "message": `i am getting really sick of eating ${fruit} after filling up on ${cake}` })
    }else{
        res.json({ message: "unauthorized" });
    }
});

app.put("/test_five/write", (req, res) => {});

app.listen(3000, () => console.log("server is running"));


