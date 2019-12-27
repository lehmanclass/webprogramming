const User = require('./models/User');
const Section = require('./models/Section');
const List = require('./models/List');
const Todo = require('./models/Todo');

console.log('SEED IS RUNNING');

User.sync({ force: true })
	.then(() => {
		Section.sync({ force: true })
			.then(() => {
				List.sync({ force: true })
					.then(() => {
						Todo.sync({ force: true })
							.then(() => console.log('\nSuccessfully created all models. Seed will end soon!'))
							.catch(() => console.log('failed to create Todo model'));
					})
					.catch(() => console.log('failed to create List model'));
			})
			.catch(() => console.log('failed to create Section model'));
	})
	.catch(() => console.log('failed to create User model'));