const pg = require ('pg');

const seedDb = async () => {

  const db=new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database:'postgres',
    password: 'postgres',
    port:5432
  });
  db.connect();

  const dropTable1 = 'DROP TABLE IF EXISTS log_in;';
  const dropTable2 = 'DROP TABLE IF EXISTS register_account;';
  const dropTable3 = 'DROP TABLE IF EXISTS payment_make;';

  await db.query(dropTable1);
  await db.query(dropTable2);
  await db.query(dropTable3);

const createlogin=`

CREATE TABLE log_in(
    username text PRIMARY KEY,
    password text
);
`;
const insert1=`
INSERT INTO log_in ( username, password) VALUES ( 'test', 'test');
`;

 const createregister=`
 CREATE TABLE register_account(
     username text PRIMARY KEY, password  text , 
     email text
 ); `;

const insert2=`
INSERT INTO register_account( username, password, email) VALUES ( 'test', 'test', 'test@test.com');
`;
const createpayment=`
 CREATE TABLE payment_make(
     cardnumber text ,
     firstname text,
     lastname text,
     cvv integer PRIMARY KEY,
     exp text, 
     address text

 );
 
 `;

const insert3=`
INSERT INTO payment_make ( firstname, lastname,  cardnumber, cvv, exp, address) VALUES ( 'test', 'test', '1234566777533992747', 0,'00/00/0000','address');


`;
 

  db.query(createlogin)
  .then(({rows=[]})=>{
  
  console.log('create ran successfully');
  return rows;
})
.catch(err => {
    console.error(err);
    console.error(err.stack);

});

db.query(insert1)
  .then(({rows=[]})=>{
  
  console.log('insert ran successfully');
  return rows;
})
.catch(err => {
    console.error(err);
    console.error(err.stack);

});

db.query(createregister)
  .then(({rows=[]})=>{
  
  console.log('create ran successfully');
  return rows;
})
.catch(err => {
    console.error(err);
    console.error(err.stack);

});

db.query(insert2)
  .then(({rows=[]})=>{
  
  console.log('insert ran successfully');
  return rows;
})
.catch(err => {
    console.error(err);
    console.error(err.stack);

});
db.query(createpayment)
  .then(({rows=[]})=>{
  
  console.log('create ran successfully');
  return rows;
})
.catch(err => {
    console.error(err);
    console.error(err.stack);

});

db.query(insert3)
  .then(({rows=[]})=>{
  
  console.log('insert ran successfully');
  return rows;
})
.catch(err => {
    console.error(err);
    console.error(err.stack);

});

};

// db.query(createlogin)
//   .then(() => executeQuery(createregister))
//   .then(() => executeQuery(createpayment))
//   .catch(err => console.log(err));

// };


seedDb();