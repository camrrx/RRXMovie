const express = require("express");
const app = express()
const bcrypt = require('bcrypt');
const { hash } = require("bcrypt");

app.use(express.json())
const users = []
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(req.body)
        const user = {email: req.body.email, username: req.body.username, password: hashedPassword }
        users.push(user);
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    console.log(req.body)
    const user = users.find(user => user.username == req.body.usernameLogin)
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