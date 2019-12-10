const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

// app.use(express.static('build'));
app.use(express.json());

app.use('/api/auth', require('./api/auth'));
app.use('/api/list', require('./api/list'));
app.use('/api/todo', require('./api/todo'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));