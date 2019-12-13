const pg = require('pg');

console.log('SEED IS RUNNING');
const dropUsers = `DROP TABLE IF EXISTS users;`;
const dropComents = `DROP TABLE IF EXISTS coments;`;
const dropBlogs = `DROP TABLE IF EXISTS blogs;`;

const createUsers = ` 	
CREATE TABLE users (
        username text PRIMARY KEY,
 		password text
		
 	);
 `;

/*const createUsers = `
	CREATE TABLE users (
        id serial PRIMARY KEY,
        username text,
		password text
		
	);
`;
*/

const createBlogs = `
    CREATE TABLE blogs (
        id serial PRIMARY KEY,
        blogText text,
        username_id text,
        FOREIGN KEY (username_id) REFERENCES users (username)
    ); 
`;
const createComents = `
    CREATE TABLE coments (
        id serial PRIMARY KEY,
        comentText text,
        username_id text,
        blog_id serial,
        FOREIGN KEY (username_id) REFERENCES users (username),
        FOREIGN KEY (blog_id) REFERENCES blogs (id)
    ); 
`;



const insertUsers = `
    INSERT INTO users (username, password ) VALUES ('user1','password1');
    INSERT INTO users (username, password ) VALUES ('user2','password2');
`;
const insertBlogs = `
    INSERT INTO blogs (blogText, username_id) VALUES ('This is just one line of text.','user1');
    INSERT INTO blogs (blogText, username_id ) VALUES ('Another line of text','user1');
`;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Natsu3237',
    port: 5432,
});

db.connect();
db.query(dropComents)
    .then(({ rows = [] }) => {
        console.log('drop coments ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });

db.query(dropBlogs)
    .then(({ rows = [] }) => {
        console.log('drop blogs ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });
db.query(dropUsers)
    .then(({ rows = [] }) => {
        console.log('drop users ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });



db.query(createUsers)
    .then(({ rows = [] }) => {
        console.log('create users ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });


db.query(insertUsers)
    .then(({ rows = [] }) => {
        console.log('insert users ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });
db.query(createBlogs)
    .then(({ rows = [] }) => {
        console.log('create blogs ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });

db.query(insertBlogs)
    .then(({ rows = [] }) => {
        console.log('insert blogs ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });

db.query(createComents)
    .then(({ rows = [] }) => {
        console.log('create coment ran successfully');
        return rows;
    })
    .catch(err => {
        console.error(err);
        console.error(err.stack);
    });