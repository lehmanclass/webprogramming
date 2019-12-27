const pg = require('pg');

console.log('SEED IS RUNNING');

const create = `

    DROP TABLE if exists posts;
    DROP TABLE if exists users;
    DROP TABLE if exists events;
    DROP TABLE if exists threads;
    
    CREATE TABLE users (
        user_name varchar(15) UNIQUE, 
        password varchar(16) NOT NULL,
        first_name varchar(18) NOT NULL,
        last_name varchar(18) NOT NULL,
        email_address text NOT NULL,
        confirm boolean NOT NULL,

        Primary Key(user_name)

    );

    CREATE TABLE events (
        user REFERENCES users(user_name),
        counter INTEGER NOT NULL,
        latest_thread_id REFERENCES threads(thread_id)

    );

    CREATE TABLE threads (
        title text NOT NULL,
        thread_id serial,
        


    );
	
    CREATE TABLE posts (

        user_name varchar(15) REFERENCES users(user_name),
        post_id serial,
        title text NOT NULL,
        message text NOT NULL, 
        created_post boolean,
        
        Primary Key (post_id, user_name)
    );

`;

const insert = `
    INSERT INTO users (user_name, password, first_name, last_name, email_address, confirm) VALUES ('test1', 'test123', 'Brian', 'Jones', 'BJ@gmail.com', false);
    INSERT INTO users (user_name, password, first_name, last_name, email_address, confirm) VALUES ('test2', 'test456', 'God', 'Jesus', 'GodJesus@gmail.com', false);
    INSERT INTO users (user_name, password, first_name, last_name, email_address, confirm) VALUES ('test3', 'test789', 'B', 'J', 'BJ123@gmail.com', false);
    
    INSERT INTO posts (user_name, title, message, created_post) VALUES ('test1','Party in the heights', 'This is how we do it adasdasdasdsaaasadaasdasdasdas.', true);
    INSERT INTO posts (user_name, title, message, created_post) VALUES ('test2','MeetUp in Dyckman', 'HAHAHA.', true);
    INSERT INTO posts (user_name, title, message, created_post) VALUES ('test3','Networking event in harlem', 'Oooouuuu killem.', false);
`;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

db.connect();

db.query(create)
	.then(({ rows = [] }) => {
		console.log('create ran successfully');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

db.query(insert)
	.then(({ rows = [] }) => {
		console.log('insert ran successfully');
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});