const pg = require('pg');

const create = `
	CREATE TABLE todos (
		id serial PRIMARY KEY,
		task text,
		completed boolean
		);
`;

const insert = `
	INSERT INTO todos (task, )
`