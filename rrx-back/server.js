const express = require("express");
const app = express()
const bcrypt = require('bcrypt');
const { hash } = require("bcrypt");
const mysql = require('mysql');

app.use(express.json())
const users = []
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//connection to your db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    port:"3306",
    password: 'root',
    database: 'dbRRX'
});

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //console.log(req.body)
        const user = {email: req.body.email, username: req.body.username, password: hashedPassword }
        
        db.query('INSERT INTO users (username, email, password) VALUE (?,?,?)', [user.username, user.email, hashedPassword], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                users.push(user);
                res.send("Values inserted");
            }
        }
        );
    }
    catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    console.log(req.body)

    const users = db.query('SELECT * FROM users');
    const user = users.find(user => users.username == req.body.usernameLogin)
    
    console.log("user :", user)

    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.passwordLogin, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()

    }
})
app.listen(9000);