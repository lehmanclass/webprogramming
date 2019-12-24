import express from 'express';

const app = express();
const port = 3000;

// GET method route
// this route oath will match requests to the root route, /.
app.get('/', function (req, res) {
  res.send('root');
});
// this route path will match request to /about.
app.get('/about', function (req, res) {
  res.send('about');
});
// this route path will match requests to /random.text.
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
// this route path will match request to /acd and /abcd.
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd');
});
// this route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', function (req, res){
  res.send('ab+cd');
});
// This route path will match abcd, abcxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', function(req, res){
  res.send('ab*cd');
});
// This route path will match /abe and /abcde
app.get('/ab(cd)?e', function (req, res){
  res.send('ab(cd)?e');
});
// this route path passes in parameters 
app.get('/userId/:userId/bookId/:bookId', function (req, res){
  res.send(req.params);
  // this returns {"userId":"Melvin","bookId":"1234"}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));