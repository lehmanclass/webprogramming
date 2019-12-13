const Email = require('./models/Email');
const Post = require('./models/Post');

console.log('SEED IS RUNNING');
  
Post.sync()
	.then(() => console.log('Successfully created Post model'))
  .catch(() => console.log('Failed to create Post model'));

Email.sync()
	.then(() => console.log('Successfully created Email model'))
	.catch(() => console.log('Failed to create Email model'));