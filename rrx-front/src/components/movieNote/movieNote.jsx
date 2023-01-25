import React, { useEffect, useState } from "react";
import "./movieNote.scss";
import "../search/search.scss";
import { getMovieCredits } from "../../API/tmdbApi";
import { getMovieDetails } from "../../API/tmdbApi";
import silhouette from "../../img/silhouette.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const MovieNote = (props) => {
  const [valueSlider, setValueSlider] = useState("");
  const [castMovie, setCastMovie] = useState({});
  const [detailsMovie, setDetailsMovie] = useState({});
  const loginUserData = useSelector((state) => state.loginUser);
  const [movieId, setMovieId] = useState("");
  const [ratingDone, setRatingDone] = useState("");
  const [gettingRate, setGettingRate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const paramsURL = new URLSearchParams(location.search);
  const research = paramsURL.get("titleMovie");
  const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);

  let API_MOVIE_URL = "http://localhost:9000/movies/";
  const API_RATE_URL = "http://localhost:9000/rate";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    if (props.movie_id) {
      getCastMovie(props.movie_id);
      getDetailsMovie(props.movie_id);
      setMovieId(props.movie_id);
      if (usernameLogin) {
        getRatingMovie(usernameLogin, props.movie_id.toString()).then((res) => {
          setValueSlider(res.data);
          if (!res.data) {
            setValueSlider("5");
            dynamicSlider(5);
          } else {
            dynamicSlider(res.data);
          }
          setGettingRate(true);
        });
      } else {
        setValueSlider("5");
        dynamicSlider(5);
        setGettingRate(true);
      }
    }
  }, [props.movie_id, usernameLogin]);

  /*Creation of the dynamic slider*/
  const dynamicSlider = (valueSlider) => {
    const active = "rgba(121,8,59,1)";
    const inactive = "#dbdbdb";

    const newBackgroundStyle = `linear-gradient(90deg, ${active} 0% ${
      valueSlider * 10
    }%, ${inactive} ${valueSlider * 10}% 100%)`;

    document.getElementById("dynamicRange") &&
      (document.getElementById("dynamicRange").style.background =
        newBackgroundStyle);
  };

  /*Get the casting of the movie and set it into a state*/
  const getCastMovie = (idMovie) => {
    getMovieCredits(idMovie).then((casting) => {
      setCastMovie(casting.cast);
    });
  };

  /*Choose if we'll display the actor or the character depending on a click action*/
  const actorOrCharacter = (person) => {
    let element = document.getElementById("actor-card-" + person.id);
    let res;
    element.innerHTML === person.name
      ? (res = person.character)
      : (res = person.name);

    element.innerHTML = res;
  };

  /*Display the card of the actors and manage if we display the actor or the character by clicking on it*/
  const displayActorCard = () => {
    return Object.keys(castMovie).map((key) => {
      let person = castMovie[key];
      return (
        <div key={person.id}>
          <div className="casting-container">
            <div className="casting-img">
              <img
                src={
                  person.profile_path
                    ? "https://image.tmdb.org/t/p/w780" + person.profile_path
                    : silhouette
                }
                alt=""
              />
            </div>

            <div className="casting-actor-container">
              <div
                id={"actor-card-" + person.id}
                className="casting-actor-div"
                onClick={() => {
                  actorOrCharacter(person);
                }}>
                {person.name}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  /*Get the details of the movie and set it into a state*/
  const getDetailsMovie = (idMovie) => {
    getMovieDetails(idMovie).then((details) => {
      setDetailsMovie(details);
    });
  };

  /* To rate the movie, if the movie has already been rated : update the rate, else create the rate in the DB */
  const ratingMovie = async (movieRate) => {
    try {
      const idMovie = movieId;
      const nameMovie = detailsMovie.title;
      const rateMovie = movieRate;
      const genreMovie = "action";
      const userId = loginUserData.usernameLogin;
      const pictureMovie = detailsMovie.backdrop_path;
      console.log("details", detailsMovie, detailsMovie.backdrop_path);
      if (!userId) {
        setRatingDone("NOK");
        return console.log("This action is not possible, please login before");
      }
      setRatingDone("OK");
      getRatingMovie(userId, idMovie).then((res) => {
        console.log(res);
        if (res.data) {
          console.log("update");
          axios.post(
            API_MOVIE_URL + "update",
            {
              idMovie,
              rateMovie,
              userId,
            },
            config
          );
        } else {
          console.log("create");
          axios.post(
            API_MOVIE_URL,
            {
              idMovie,
              nameMovie,
              rateMovie,
              genreMovie,
              userId,
              pictureMovie,
            },
            config
          );
        }
      });
    } catch (err) {
      console.log("error register", err);
    }
    navigate("/search?titleMovie=" + research);
  };

  /*To check if the movie has already been rating, if yes get the rate*/
  const getRatingMovie = async (idUser, idMovie) => {
    try {
      let res = axios.get(API_RATE_URL + "/" + idUser + "/" + idMovie, config);
      return res;
    } catch (err) {
      console.log("error register", err);
    }
  };

  return gettingRate ? (
    <div id="modal-container-id" className="modal-container">
      <div className="background-modal-overlay"></div>

      <div className="background-modal">
        <img
          src={
            detailsMovie && detailsMovie.backdrop_path
              ? "https://image.tmdb.org/t/p/w500/" + detailsMovie.backdrop_path
              : ""
          }
          alt=""
        />
      </div>
      <div className="info-container">
        <div id="button-container-id" className="button-container">
          <Link
            to={
              props.title_movie
                ? "/search?titleMovie=" + props.title_movie
                : "/profile"
            }>
            <div className="button-close">
              <span className="material-icons">clear</span>
            </div>
          </Link>
        </div>
        <div className="movie-and-genre-container">
          <div id="title-movie-id" className="title-movie-container">
            {detailsMovie.title}
          </div>
          <div className="genre-container">
            {detailsMovie.genres
              ? detailsMovie.genres.map((genre, index) => {
                  return (
                    <div key={genre.id} className="details-movie-genre">
                      {genre.name}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="description-container">
          {detailsMovie.overview ? (
            <p>{detailsMovie.overview} </p>
          ) : (
            <p>This movie does not have any description</p>
          )}
        </div>

        <div className="actor-card-container">
          <div className="casting-movie-container">{displayActorCard()}</div>
        </div>

        <div className="slidecontainer">
          <input
            id="dynamicRange"
            className="slider"
            type="range"
            min="0"
            max="10"
            value={valueSlider}
            onChange={(e) => {
              setValueSlider(e.target.value);
              dynamicSlider(e.target.value);
            }}
          />
        </div>

        <div className="container-rating-movie">
          <button
            className="button-to-rate"
            onClick={() => {
              ratingMovie(valueSlider);
            }}>
            <h1 className="rating-movie">{valueSlider}</h1>
          </button>
          {ratingDone === "NOK" && (
            <p>This action is not possible, please login before</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default MovieNote;
