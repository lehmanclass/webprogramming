const express = require("express");
const dbOperations = require("./database");
const queryExecutor = dbOperations.queryExecutor;

const app = express();

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const insertQuery = dbOperations.insertQuery(
    "users_t",
    ["user_name", "email", "password"],
    [username, email, password]
  );

  // queryExecutor(insertQuery)
  //   .then(() => res.sendStatus(200))
  //   .catch(e => res.sendStatus(500));
  res.sendStatus(200)
});

app.post("/createGoal", (req, res) => {});

app.get("/goals", (req, res) => {});

app.delete("/goals/id", (req, res) => {});

app.put("/goals/id", (req, res) => {});

app.post("/createTask", (req, res) => {});

app.get("/tasks", (req, res) => {});

app.delete("/tasks/id", (req, res) => {});

app.put("/goals/id", (req, res) => {});

app.listen(5000, () => console.log("server is running"));
