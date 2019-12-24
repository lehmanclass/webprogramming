const pg = require("pg");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432
});
db.connect();

const checkout = `
DROP TABLE IF EXISTS checkout ;

CREATE TABLE checkout(
    id serial Primary Key,
    product_name text not null,
    quantity INTEGER not null,
    subtotal FLOAT(20) not null,
    tax FLOAT(20) not null,
    total FLOAT(20)
);
Drop Table IF EXISTS users;
Create Table users(
  id serial Primary key,
  email text not null unique,
  password text not null,
  name text not null
);
`;

const insert1 = `
INSERT INTO checkout (product_name, quantity, subtotal, tax, total) VALUES ( 'Dell',2 ,56 ,3 ,59);
`;

db.query(checkout)
  .then(({ rows = [] }) => {
    console.log("create ran successfully");
    return rows;
  })
  .catch(err => {
    console.error(err);
    console.error(err.stack);
  });

db.query(insert1)
  .then(({ rows = [] }) => {
    console.log("insert ran successfully");
    return rows;
  })
  .catch(err => {
    console.error(err);
    console.error(err.stack);
  });
