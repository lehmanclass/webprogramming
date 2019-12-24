const express = require("express");
const pg = require("pg");
const app = express();

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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    `insert into users (name, email, password) values ('${name}','${email}','${password}') returning *;`
  )
    .then(({ rows: vals }) => {
      res.json({ id: vals[0].id });
    })
    .catch((err) => {
      console.error(err);
      console.error(err.stack);
    });

})

app.post("/checkout", (req, res) => {
  const { productName, quantity, subtotal, tax, total } = req.body;
  db.query(
    `INSERT INTO checkout (product_name, quantity, subtotal, tax, total) VALUES ( '${productName}', ${quantity} , ${subtotal} , ${tax}, ${total});`
  )
    .then(({ rows = [] }) => {
      res.json({ message: "Successfully checked out" });
    })
    .catch((err) => {
      console.error(err);
      console.error(err.stack);
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    `SELECT id FROM users WHERE email = '${email}' AND password = '${password}'`
  ).then(({ rows: vals }) => {
    res.json(vals[0]);
  });
});

app.listen(5000);
