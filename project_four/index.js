
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


app.get('community/event/threads', (req, res) => {
  

})

app.get('community/event/threads/:thread/posts', (req, res) => {
  
})



app.put('community/register', (req, res) => {
  const {body : {userName, emailAddress,  }}

})



app.listen(PORT, () => console.log('listnin'));