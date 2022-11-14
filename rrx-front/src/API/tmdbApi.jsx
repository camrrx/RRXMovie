import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=9952e490be27ea079da3d33dd5079f67";

export const getMovies = async (titleMovie) => {
  try {
    const res = await axios.get(
      API_URL +
        "/search/movie?language=fr-FR&query=" +
        titleMovie +
        "&page=1&" +
        API_KEY
    );
    //console.log(res.data.results);

    return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getMovieCredits = async (movie_id) => {
  try {
    let res = await axios.get(
      API_URL + "/movie/" + movie_id + "/credits?" + API_KEY + "&language=fr-FR"
    );
    console.log("res casting", res.data.cast);
    return res.data.cast;
  } catch (e) {
    console.log(e);
  }
};
