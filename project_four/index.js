const express = require('express');
const app = express();
const PORT = 3000;
const {Client} = require('pg');
const axios = require('axios')
const path = require('path')

const APIKEY = process.env.GOOGLE_BOOKS_API_KEY;
//const APIKEY = "AIzaSyCA1uU3MKHCxhFvOnzA6IlXlytMtpJlKCk";

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.json());

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });
  
  db.connect();

  app.post('/book_search', (req,res) => {
    const searchTerm = req.body.searchTerm
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${APIKEY}`).then( resp => {
      res.json({items: resp.data.items})
    }).catch(e => console.log(e))

  });

  const insert = `
	INSERT INTO wantToRead (id, name) VALUES ($1, $2);
`;

  app.post('/insert_book', (req,res) => {
    const book = req.body.book;

    db.query(insert, [book.id, book.volumeInfo.title])
	.then(({ rows = [] }) => {
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
  });

  });

app.get('/retrieve_book', (req,res) =>{

  db.query('SELECT * FROM wantToRead')
  .then(({rows: books}) => {
    res.json({books})
  })
});

app.post('/delete_book', (req,res) => {
  const id = req.body.bookid;
  

  db.query( `DELETE FROM wantToRead WHERE id = '${id}' returning *`)
  .then(({rows: book}) => {
    res.json({book: book[0]})
  })

});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));