
const express = require('express');
const {Client} = require('pg');
const app = express();

const PORT = 5000;

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('build'));
app.use(express.json());

db.connect();

const readTitle = db.query('SELECT title from posts;');
const readUser = db.query()
const readPosts = () =>  db.query('SELECT * from posts;');


app.get('/event/posts', (req, res) => {
  

})



app.put('/event/register', (req, res) => {
  const {body : {userName, emailAddress,  }}

})



app.listen(PORT, () => console.log('listnin'));