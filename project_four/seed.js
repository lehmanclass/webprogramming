const { Client } = require('pg');

const buildQueryExecutor = client => query => db.query(query)
	.then(({ rows = [] }) => rows)
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5433,
});

db.connect();

const main = async () => {

	const executeQuery = buildQueryExecutor(db);
    
    const createUsers = `CREATE TABLE users_t (
        id SERIAL PRIMARY KEY,
        user_name text,
        email text,
        password text
    );`

    const createGoals = `CREATE TABLE goals (
        id SERIAL PRIMARY KEY,
        user_id int,
        name text,
        description text,
        status text
    );`

    const createTasks = `CREATE TABLE "tasks" (
        id SERIAL PRIMARY KEY,
        user_id int,
        goal_id int,
        name text,
        description text,
        status text
    );`

    const alterGoals = `ALTER TABLE "goals" ADD FOREIGN KEY ("user_id") REFERENCES "users_t" ("id");`

    const alterTasks = `ALTER TABLE "tasks" ADD FOREIGN KEY ("goal_id") REFERENCES "goals" ("id");`

	// const insert = `INSERT INTO names values (nextval('names_id_seq'), 'bruh');`;
	// const read = `SELECT * FROM names;`;

	try {
        await executeQuery(createUsers);
        await executeQuery(createGoals);
        await executeQuery(createTasks);
		console.log('Tables created');
	} catch (err) {
		console.error();
    }
    
    await executeQuery(alterGoals);
    await executeQuery(alterTasks);

	// result = await executeQuery(insert);
	// console.log(result);

	// result = await executeQuery(read);
	// console.log(result);

	db.end();
};

main();
