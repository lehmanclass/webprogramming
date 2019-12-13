const express = require("express");
const pg = require("pg");
const app = express();
var bodyParser = require("body-parser");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "p",
  port: 5432
});
db.connect();
// app.use(express.static('build'));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post('/checkout', (req, res) => {
  const {productName, quantity, subtotal, tax, total} = req.body;
  db.query(`INSERT INTO checkout (product_name, quantity, subtotal, tax, total) VALUES ( '${productName}', ${quantity} , ${subtotal} , ${tax}, ${total});`)
    .then(({ rows = [] }) => {
      res.json({message: "Successfully checked out"});
    })
    .catch(err => {
      console.error(err);
      console.error(err.stack);
    });
});

app.listen(5000);
