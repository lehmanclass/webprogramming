const express = require("express");
const helpers = require("./utils");
const fakeDB = require("../fakeassdatabase/index");

const DB = new fakeDB();

const app = express();

app.use(express.json());

app.get("/test_one", (req, res) => {
  const message = {
    message: {
      fruit: req.query.fruit,
      cake: req.query.cake
    }
  };
  res.json(message);
});

app.post("/test_two", (req, res) => {
  const { fruit, cake } = req.body;
  res.json({ massage: `i love to eat ${fruit} with ${cake}` });
});

app.get("/test_three/:fruit/:cake", (req, res) => {
  const { fruit, cake } = req.params;
  helpers.isAuthorized(req.headers)
    ? res.json({
        message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`
      })
    : res.json({ message: "unauthorized" });
});

app.post("/test_four", (req, res) => {
  const { fruit, cake } = req.body;
  if (helpers.isAuthorized(req.headers)) {
    res.json({
      message: `i am getting really sick of eating ${fruit} after filling up on ${cake}`
    });
  } else {
    res.json({ message: "unauthorized" });
  }
});

app.put("/test_five/write", (req, res) => {
  const { fruit, cake } = req.body;
  helpers.handleUpdateRequest(fruit);
  helpers.handleUpdateRequest(cake);
  res.json({ message: `you sent ${fruit} and ${cake}` });
});

app.get("/test_five/read", (req, res) => {
  res.json(DB.data);
});

app.listen(3000, () => console.log("server is running"));
