const express = require('express');
const FakeAssDatabase = require('./fakeassdata.js');
const app = express();

app.use(express.json())
app.use(express.urlencoded());

const PORT = 3000;

const DATABASE = new FakeAssDatabase();

app.get('/test_one', (req,res) => {
 	res.json({ message: {
 		"fruit": req.query.fruit,
 		"cake": req.query.cake
 	}})
 	 })

app.post('/test_two', (req,res) =>{
	const fruit = req.body.fruit;
	const cake = req.body.cake;
	res.json( { message: `i love to eat ` + fruit + ` with `+ cake });
})

app.get('/test_three/:fruit/:cake', (req,res) =>{
	const fruit = req.params.fruit;
	const cake = req.params.cake;
	const TOKEN = 'projecttwo';

	const token = req.headers.authorization.replace('Bearer ', '');

	if(TOKEN === token){
		res.json({ message: 'you sent ' + fruit + ' and ' + cake
 + ', but I only eat ' + cake + '!'}); }
		else{
		res.json({ message: 'unauthorized'});
	}

})

app.post('/test_four', (req, res) => {
	const fruit = req.body.fruit;
	const cake = req.body.cake;

	res.json({ message: 'i am getting really sick of eating ' +  fruit  + ' after filling up on ' + cake
	});
		
})


app.put('/test_five/write', (req,res) => {
	const fruit = req.body.fruit;
	const cake = req.body.cake;

	try{

	DATABASE.create(fruit, 1);
}
	catch{
	DATABASE.update(fruit, DATABASE.read(fruit) + 1);

}
	try{

	DATABASE.create(cake, 1);
}
	catch{
	DATABASE.update(cake, DATABASE.read(cake) + 1);

}
res.json({
		message: 'you sent ' + fruit  + ' and ' + cake
	})
		
})

app.get('/test_five/read', (req,res) => {
	const fruit = req.body.fruit;
	const cake = req.body.cake;

	res.json(
		DATABASE.data
		)
})

app.put('/test_five/write', (req,res) => {
	const fruit = req.body.fruit;
	const cake = req.body.cake;

	res.json({ message: 'i am getting really sick of eating ' +  fruit  + ' after filling up on ' + cake
	});

})

app.get('/test_five/read/:fruit/:cake', (req,res) => {
	const fruit = req.body.fruit;
	const cake = req.body.cake;
		try{

	DATABASE.create(fruit, 1);
}
	catch{
	DATABASE.update(fruit, DATABASE.read(fruit) + 1);

}
	try{

	DATABASE.create(cake, 1);
}
	catch{
	DATABASE.update(cake, DATABASE.read(cake) + 1);

}
	res.json(
		DATABASE.data
	)
})



app.listen(PORT, () => console.log(`listening on ${PORT}`))