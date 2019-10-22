const express = require("express");
const app = express();

app.get("/test_one", (req, res) => {
  const message = {
    message: {
      fruitMessage: req.query.fruit,
      cakeMessage: req.query.cake
    }
  };
  res.json(message);
});

app.post("/test_two", (req, res) => {});

app.get("/test_three/", (req, res) => {});

app.post("/test_four", (req, res) => {});

app.put("/test_five/write", (req, res) => {});

app.listen(3000, () => console.log("server is running"));
