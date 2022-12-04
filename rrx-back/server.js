const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const mysql = require("mysql");

app.use(express.json());
const users = [];
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

//connection to your db
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	port: "3306",
	password: "root",
	database: "dbRRX",
});

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/users", (req, res) => {
	res.json(users);
});

app.post("/users/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		//console.log(req.body)
		const user = { email: req.body.email, username: req.body.username, password: hashedPassword };
		
		const usernameAvailable = await isUsernameAvailable(user.username);
		const emailAvailable = await isUsernameAvailable(user.email);
		if(usernameAvailable && emailAvailable){
			db.query(
				"INSERT INTO users (username, email, password) VALUE (?,?,?)",
				[user.username, user.email, hashedPassword],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						//users.push(user);
						res.send("Values inserted");
					}
				}
			);
		} else {
			console.log("This profile already exists");
		}
		
	} catch {
		res.status(500).send();
	}
});

app.post("/users/login", async (req, res) => {
	let username = req.body.usernameLogin;
	let password = req.body.passwordLogin;

	const passwordDb = await getUserPassword(username);

	try {
		if (await bcrypt.compare(password, passwordDb)) {
			res.send("Success");
		} else {
			res.send("Not Allowed");
		}
	} catch {
		res.status(500).send();
	}
});

function getUserPassword(username) {
	return new Promise((resolve, reject) => {
		db.query("SELECT password FROM users WHERE username = ?", [username], (err, result) => {
			if (err || !result.length) {
				console.log("Error while tryin to login");
				return err ? err : null;
			} else {
				return resolve(result[0].password);
			}
		});
	});
}

function isUsernameAvailable(username) {
	return new Promise((resolve, reject) => {

		db.query("SELECT username FROM users WHERE username = ?", [username], (err, result) => {
			if (err || result.length) {
				console.log("Error while tryin to register");
				return reject(false);
			}
			else {
				return resolve(true);
			}
		});
	})
}
function isEmailAvailable(email) {
	return new Promise((resolve, reject) => {

		db.query("SELECT email FROM users WHERE email = ?", [email], (err, result) => {
			if (err || result.length) {
				console.log("Error while tryin to register");
				return reject(false);
			}
			else {
				return resolve(true);
			}
		});
	})
}
app.listen(9000);
