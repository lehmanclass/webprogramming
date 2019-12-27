const express = require('express');
const app = express();
const jsonMiddleware = express.json();
const PORT = 3000;
const TOKEN = 'nowyoudoit'; //(to be able to compare it with incoming token)

app.use(jsonMiddleware);

const callback = (request, response) => {
	console.log('headers ->', request.headers);
	console.log('req.body ->', request.body);
	const token = request.headers.authorization.replace('Bearer ', '');

	if (token === TOKEN) {
		response.send('You did the right thing ');
	} else {
		response.send('You did not do the right thing ');
	}


	// const responseString = 'you sent token of ${token} ';
	// response.send(responseString);
};

app.post('/attend', callback);

app.listen(PORT, () => console.log('listening on port', PORT)); 