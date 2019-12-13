
const express = require('express');
const pg = require('pg');
const app = express();

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Natsu3237',
    port: 5432,
});
app.use(express.static('build'));
app.use(express.json());

db.connect();

app.post('/login', async (req,res) =>{
    let username = req.body.username;
    let password = req.body.password;

    const query= `SELECT * from users u where u.username = '${username}';`;
    let { rows } = await db.query(query);

    let userName; 
    let passWord; 

    // rows.forEach(({ username, password }) => {
    //     userName = username;
    //     passWord = password
    // });

    rows.forEach(row => {
        userName = row.username;
        passWord = row.password;
    });    

    if (userName && passWord) {
           
   
    if (username === userName && password === passWord){
        return res.status(200).json({ authorized: true });
    }
   else{
        return res.json({ authorized:false, message: 'please check your username and password' });
   }
}
else{
    return res.json({ authorized: false, message:'please check your username and password'});
}

});
app.post('/create/blog', async  (req,res)=>{
    
    let username = req.body.username;
    let blogText = req.body.blogText;

    let query= `INSERT INTO blogs (blogText, username_id) VALUES ('${blogText}','${username}')`;
   
    await db.query(query);

    return res.json({message: `A blog was created by '${username}'`});
});

app.post('/search/blogs' , async (req,res)=> {
    let username =  req.body.username;

    let query = `SELECT * from blogs u where u.username_id = '${username}';`;
    const result = await db.query(query);

    return res.json(result.rows);




});

app.post('/create/comment', async (req, res) => {

    let username = req.body.username;
    let blogId = req.body.blogId
    let comentText = req.body.comentText;

    let query = `INSERT INTO coments (comentText, username_id, blog_id) VALUES ('${comentText}','${username}','${blogId}')`;
    
    await db.query(query);

    return res.json({ message: `A comment was created by '${username}' in blog ${blogId}` });
});

app.post('/search/comments', async (req, res) => {
    let blogid = req.body.blogid;

    let query = `SELECT * from coments u where u.blog_id = '${blogid}';`;
    const result = await db.query(query);

    return res.json(result.rows);




});



app.listen(3000, () => console.log('listnin'));