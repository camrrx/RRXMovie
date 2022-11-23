import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=9952e490be27ea079da3d33dd5079f67";

/*Get all the movies according to the title of movie*/
export const getMovies = async (titleMovie) => {
  try {
    const res = await axios.get(
      API_URL +
        "/search/movie?language=fr-FR&query=" +
        titleMovie +
        "&page=1&" +
        API_KEY
    );
    // console.log(res.data.results);

    return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

/*Get all the credits of the movie according to the id of movie
Casting -> Name, Character...
Crew -> Realisator...
*/
export const getMovieCredits = async (movie_id) => {
  try {
    let res = await axios.get(
      API_URL + "/movie/" + movie_id + "/credits?" + API_KEY + "&language=fr-FR"
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/*Get all the details of the movie according to the id of movie*/
export const getMovieDetails = async (movie_id) => {
  try {
    let res = await axios.get(
      API_URL + "/movie/" + movie_id + "?" + API_KEY + "&language=fr-FR"
    );

    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
