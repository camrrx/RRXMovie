import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=9952e490be27ea079da3d33dd5079f67";

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZTQ5MGJlMjdlYTA3OWRhM2QzM2RkNTA3OWY2NyIsInN1YiI6IjYzMzM1ZTEwYTE0YmVmMDA3ZGUyYmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yfojvk4mxM86ACxiknPZs2K7lKk0gDKcxkn03OLk_vA",
	},
};
/*Get all the movies according to the title of movie*/
export const getMovies = async titleMovie => {
	try {
		const res = await axios.get(
			API_URL +
				"/search/movie?language=fr-FR&query=" +
				titleMovie +
				"&page=1&" +
				API_KEY,
			options
		);
		return res.data.results;
	} catch (e) {
		console.log(e);
	}
};

/*Get all the credits of the movie according to the id of movie
Casting -> Name, Character...
Crew -> Realisator...
*/
export const getMovieCredits = async movie_id => {
	try {
		let res = await axios.get(
			API_URL +
				"/movie/" +
				movie_id +
				"/credits?" +
				API_KEY +
				"&language=fr-FR",
			options
		);
		return res.data;
	} catch (e) {
		console.log(e);
	}
};

/*Get all the details of the movie according to the id of movie*/
export const getMovieDetails = async movie_id => {
	try {
		let res = await axios.get(
			API_URL + "/movie/" + movie_id + "?" + API_KEY + "&language=fr-FR",
			options
		);

		return res.data;
	} catch (e) {
		console.log(e);
	}
};

export const getPopularMovies = async () => {
	try {
		let res = await axios.get(
			`${API_URL}/movie/popular?${API_KEY}&language=fr-FR`,
			options
		);
		console.log(res.data);

		return res.data;
	} catch (e) {
		console.log(e);
	}
};
