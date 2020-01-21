const express = require('express');

const app = express();

const jsonMiddleware = express.json();

const PORT = 3000;

const TOKEN = 'nowyoudoit';

app.use(jsonMiddleware);

const callback = (req, res) => {
    console.log('headers ->',  req.headers);
    console.log('req.body ->', req.body);

    const token = req.headers.authorization.replace('Bearer ', '');

    if (TOKEN !== token){
        res.json({ message: 'get outta here hacker' });
    }

    const body = req.body;

    // if ()



    const responseString = 'you sent token of ${token}';
    //this is how you send a response res.send(response);
    res.send(responseString);
};


app.post('/attend', callback);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));