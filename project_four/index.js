const express = require('express');

const pg = require('pg');
const app = express();

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('build'));
app.use(express.json());

db.connect();

db. query('SELECT * from users', (err, res) => {
    console.log(err,res)
    db.end()
});
app.listen(3000, () => console.log('listnin...'));