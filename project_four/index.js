const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login", (req, res) => {

});

app.post("/register", (req, res) => {

});

app.post("/createGoal", (req, res) => {

});

app.get("/goals", (req, res) => {

});

app.delete("/goals/id", (req, res) => {

});

app.put('/goals/id', (req, res) => {

})

app.post("/createTask", (req, res) => {

});

app.get("/tasks", (req, res) => {

});

app.delete("/tasks/id", (req, res) => {

});

app.put('/goals/id', (req, res) => {
    
})

app.listen(5000, () => console.log("server is running"));
