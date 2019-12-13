let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let app= express();

let pool = new pg.Pool({
    port: 5432,
    password: 'Tiger12345',
    database: 'pokedex',
    max: 3,
    host: 'localhost',
    user:'postgres'
});

pool.connect()
.then(res => console.log('connected'))
.catch( err => console.log(err));

const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
