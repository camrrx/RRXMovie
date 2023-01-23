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
		const emailAvailable = await isEmailAvailable(user.email);
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

app.get("/movies", async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM movies WHERE users_idusers = ?", [req.id], (err, result) => {
			if (err || !result.length) {
				return err ? err : null;
			} else {
				return resolve(result);
			}
		});
	});
});

app.post("/movies", async (req, res) => {
	const movie = { id_movie: req.body.idMovie, name: req.body.nameMovie, rate: req.body.rateMovie,  genre: req.body.genreMovie ,  users_id: req.body.userId , picture: req.body.pictureMovie };
	return new Promise((resolve, reject) => {
		db.query("INSERT INTO movies (id_movie, name, rate, genre, users_idusers, picture) VALUE (?,?,?,?,?,?)",
		[movie.id_movie, movie.name, movie.rate,movie.genre,movie.users_id, movie.picture], (err, result) => {
			if (err) {
				console.log(err);
				return reject(err);
			} else {
				res.send("Values inserted");
				return resolve(result);
			}
		});
	});
});

app.post("/movies/update", async (req, res) => {
	const movie = { id_movie: req.body.idMovie,  rate: req.body.rateMovie,   users_id: req.body.userId  };

	return new Promise((resolve, reject) => {
		db.query("UPDATE movies SET rate = ? WHERE users_idusers = ? AND id_movie=?", [movie.rate, movie.users_id, movie.id_movie], (err, result) => {
			if (err) {
				console.log(err);
				return reject(err);
			} else {
				res.send("Values inserted");
				return resolve(result);
			}
	})
		
	});

});

function getUserPassword(username) {
	return new Promise((resolve, reject) => {
		db.query("SELECT password FROM users WHERE username = ?", [username], (err, result) => {
			if (err || !result.length) {
				console.log("Error while tryin to login");
				return err ? reject(err) : null;
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
				console.log("Error while tryin to register : the username already exists");
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
				console.log("Error while tryin to register : the email already exists");
				return reject(false);
			}
			else {
				return resolve(true);
			}
		});
	})
}

app.get("/rate/:idUser/:idMovie", async (req, res) => {
	const idUser = req.params.idUser;
	const idMovie = req.params.idMovie;

	db.query("SELECT rate FROM movies WHERE users_idusers = ? AND id_movie = ? ", [idUser, idMovie], (err, result) => {
		if (err) {
			console.log("Error");
			res.status(500).send(err);
		}
		else if (result.length) {
			res.status(200).send(result[0].rate.toString());
		} else {
			res.status(200).send(null);
		}
	})
});

app.get("/rate/:idUser", async (req, res) => {
	const idUser = req.params.idUser;

	db.query("SELECT * FROM movies WHERE users_idusers = ?", [idUser], (err, result) => {
		console.log(result);
		if (err) {
			console.log("Error");
			res.status(500).send(err);
		}
		else if (result.length) {
			res.status(200).send(result);
		} else {
			res.status(200).send(null);
		}
	})
});

app.listen(9000);
