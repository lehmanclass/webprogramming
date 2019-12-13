const { Client } = require("pg");
const mockData = require("./mock_data/index");

const buildQueryExecutor = client => query =>
  db
    .query(query)
    .then(({ rows = [] }) => rows)
    .catch(err => {
      console.error(err);
      console.error(err.stack);
    });

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

db.connect();

const main = async () => {
  const executeQuery = buildQueryExecutor(db);

  const createUsers = `CREATE TABLE users_t (
        id SERIAL PRIMARY KEY,
        user_name text,
        email text,
        password text
    );`;

  const createGoals = `CREATE TABLE goals (
        id SERIAL PRIMARY KEY,
        user_id int,
        name text,
        reason text,
        description text,
        status text
    );`;

  const createTasks = `CREATE TABLE "tasks" (
        id SERIAL PRIMARY KEY,
        goal_id int,
        name text,
        description text,
        status text
    );`;

  const alterGoals = `ALTER TABLE "goals" ADD FOREIGN KEY ("user_id") REFERENCES "users_t" ("id");`;
  const alterTasks = `ALTER TABLE "tasks" ADD FOREIGN KEY ("goal_id") REFERENCES "goals" ("id");`;

  try {
    await executeQuery(createUsers);
    await executeQuery(createGoals);
    await executeQuery(createTasks);
    console.log("Tables created");
  } catch (err) {
    console.error();
  }

  await executeQuery(alterGoals);
  await executeQuery(alterTasks);

  for (let i = 0; i < mockData.users.length; i++) {
    const user = mockData.users[i];
    try {
      await executeQuery(
        `insert into users_t (user_name, email, password) values ('${user.user_name}','${user.email}','${user.password}');`
      );
    } catch (e) {
      console.log("error inserting users");
    }
  }

  for (let i = 0; i < mockData.goals.length; i++) {
    const goal = mockData.goals[i];
    try {
      await executeQuery(`insert into goals (name, reason, description, status, user_id) values (
        '${goal.name}','${goal.reason}','${goal.description}', '${goal.status}', ${goal.user_id});`);
    } catch (e) {
      console.log("error inserting goals");
    }
  }

  for (let i = 0; i < mockData.tasks.length; i++) {
    const task = mockData.tasks[i];
    try {
      await executeQuery(
        `insert into tasks (goal_id, name, description, status) values(${task.goal_id},'${task.name}','${task.description}','${task.status}');`
      );
    } catch (e) {
      console.log("error inserting tasks");
    }
  }

  db.end();
};

main();
