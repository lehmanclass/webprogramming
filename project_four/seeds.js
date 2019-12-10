const User = require('./models/User');
const List = require('./models/List');
const Todo = require('./models/Todo');

console.log('SEED IS RUNNING');

User.sync()
	.then(() => {
		List.sync()
		.then(() => {
			Todo.sync()
				.then(() => console.log('Successfully created all models. Seed will end soon!'))
				.catch(() => console.log('failed to create Todo model'));
		})
		.catch(() => console.log('failed to create List model'));
	})
	.catch(() => console.log('failed to create User model'));