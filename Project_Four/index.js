const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/animals', db.getAnimal);
app.get('/animals/:id', db.getAnimalById);
app.post('/animals',bodyParser.json(), db.createAnimal);
app.put('/animals/:id', db.updateAnimal);
app.delete('/animals/:id', db.deleteAnimal);

app.listen(3000, () => console.log('Server WORKS!'));

