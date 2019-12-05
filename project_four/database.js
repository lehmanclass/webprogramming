const { Client } = require("pg");

const buildQueryExecutor = client => query =>
  db
    .query(query)
    .then(({ rows = [] }) => rows)
    .catch(err => {
      console.error(err);
      console.error(err.stack);
    });

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5433
});

db.connect();

const queryExecutor = buildQueryExecutor(db);

const insertQuery = (table, columns, values) => {
  return `insert into ${table} (${columns.toString()}) values (${addQuotes(values)});`;
};

const updateQuery = (table, columns, newValues, condition) => {
    if(columns.length == newValues.length){
        const columnsAndValues = columns.map((column, index) => {
            return `${column}=${newValues[index]}`;
        })
        return `update ${table} set ${columnsAndValues.toString()} where ${condition};`;
    }else{
        throw 'wrong columns and values length don not match';
    }
    
}

function addQuotes(values){
    let withQuotes = "";
    values.forEach((value, index) => {
        
        index < values.length -1 ? withQuotes+=`'${value}',` : withQuotes+=`'${value}'`;
    });

    return withQuotes;
}

function checkIfUserExist(username) {
  const query = `select * from users_t where(user_name='${username}');`;
  return queryExecutor(query).then(data => data.length == 1);
}

module.exports = {
    queryExecutor,
    updateQuery,
    insertQuery,
    checkIfUserExist
};
