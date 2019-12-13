const { Client } = require('pg');


// const buildQueryExecutor = client => query => db.query(query)
// 	.then(({ rows = [] }) => rows)
// 	.catch(err => {
// 		console.error(err);
// 		console.error(err.stack);
//     });
    
// let DateNow = moment().format('LLLL');

console.log('Seeding!');

const create = `

    DROP Table if exists appointments;

	CREATE TABLE appointments (
		ticket serial PRIMARY KEY,
        client text,
        human boolean,
        reason_for_visit text,
        appointment_time timestamp
    );
`;

// const insert = `
//     INSERT INTO clients (client, human, doctor, reason_for_visit, appointment_time, checked_in) VALUES ('John Doe', true, 'Dr. Woo', 'Walk-in', '${DateNow}', true);
//     INSERT INTO clients (client, human, doctor, reason_for_visit, appointment_time, checked_in) VALUES ('Mary Jane', true, 'Dr. Pringle', 'Appointment', '${DateNow}', false);
//     INSERT INTO clients (client, human, doctor, reason_for_visit, appointment_time, checked_in) VALUES ('Luigi Boo', false, 'Dr. Woof', 'Walk-in', '${DateNow}', true);
// `;

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });
      
db.connect();

db.query(create)
    .then(({ rows = [] }) => {
        console.log("Table created!");
        return rows;
    })
    .catch(err => {
		console.error(err);
		console.error(err.stack);
	});

// db.query(insert)
//     .then(({ rows = [] }) => {
// 		console.log('Row inserted!');
// 		return rows;
// 	})
// 	.catch(err => {
// 		console.error(err);
// 		console.error(err.stack);
	// });

// When node seed.js is run, it creates the tables above. 
// Now I need to find how to insert these same rows as above, without manually putting them in once seed.js is running.