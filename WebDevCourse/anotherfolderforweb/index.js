const express = require('express');

const app = express();

app.use(express.json());

const EXPECTED_TOKEN = 'request';

const FakeAssDatabase = {

};


const handleAttend = (req, res) => {
	//console.log('as soon as I see a res.send(), I will respond...');
	//console.log(req.headers);
	//res.send('you tried to attend');
	//res.send(req.headers);

	const sentToken = req.headers.authorization.replace('Bearer ', '');
	const data = req.body;

	// const { email } = data;

	const email = data.email;

	console.log(data);

	if (sentToken === EXPECTED_TOKEN){
		if (FakeAssDatabase[email]){
			res.json({ message: 'attendence already recorded'});

		} else {
			FakeAssDatabase[email] = 1;
			res.json({ message: 'attendence recorded' });
		}
	} else {
		res.json({ message: 'unauthorized '});
	}
	
};

const onListen = () => {
	console.log('i am listening');
};

app.get('/hello', (req, res) => res.send('hello'));

app.post('/attend', handleAttend);

app.listen(3000, onListen);

