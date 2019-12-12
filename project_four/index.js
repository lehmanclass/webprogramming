const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + '/project_four/src')));
app.get('', function(req,res) {
  res.redirect('App.js');
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'project_four/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'project_four/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));