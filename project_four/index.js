const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketIo = require('socket.io')
const io = socketIo(http)
const Email = require('./models/Email');
const Post = require('./models/Post');
const PORT = 3000;
const SOCKET_PORT = 8000;

app.use(express.static('build'));
app.use(express.json());

app.post('/api/email', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(409).json({message: 'All fields must be filled in to send'})
  }

  Email.create({...req.body})
    .then(() => res.json({message: 'Email has been successfully sent'}))
    .catch(() => res.status(500).json({message: 'Failed to send email'}));
});

app.post('/api/post', (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(409).json({message: 'Must fill in field'});
  }

  Post.create({message})
    .then((post) => res.json({post}))
    .catch(() => res.status(500).json({message: 'Failed to post message'}));
});

io.on('connection', function(socket) {
  socket.on('new post', function(msg) {
    io.emit('new post', msg);
  });
});

app.get('/api/post', (req, res) => {
  Post.findAll()
    .then((posts) => res.json({posts}))
    .catch(() => res.status(500).json({message: 'Failed to post message'}));
});

io.listen(SOCKET_PORT);
console.log(`Socket listening on port ${SOCKET_PORT}`);

http.listen(PORT, () => console.log(`Server listening on port ${PORT}`));