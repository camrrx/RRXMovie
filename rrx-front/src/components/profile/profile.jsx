import React, { useState, useEffect } from "react";
import "./profile.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import LoginButton from "../loginButton/loginButton";
import logo from "../../img/rrxLogo.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);
  const [movieRated, setMovieRated] = useState({});

  const API_MOVIE_RATED_URL = "http://localhost:9000/rate";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    getMovieRated(usernameLogin).then((res) => {
      setMovieRated(res.data);
    });
    // .then((movieRated) => {
    //   sortRatedMovies(movieRated);
    // });
  }, [usernameLogin]);

  const getMovieRated = async (idUser) => {
    try {
      let res = axios.get(API_MOVIE_RATED_URL + "/" + idUser, config);
      //console.log("res", res);
      return res;
    } catch (err) {
      console.log("error register", err);
    }
  };

  // const compareNombres = (a, b) => {
  //   console.log(a);
  //   return a.rate - b.rate;
  // };

  // const sortRatedMovies = (a, b) => {
  //   console.log("sorting", movieRated);
  //   return movieRated.sort(compareNombres(a, b));
  // };

  return (
    <div className="profile-container">
      <div className="header-container">
        <div className="title-container">
          <Link to="/home">
            <div>
              <img className="logo-rrx" src={logo} alt="" />{" "}
            </div>
          </Link>
          <div className="text-movie">
            <p>
              <small>The</small> Movie Ratings App
            </p>
          </div>
        </div>

        <div className="header-end">
          <LoginButton />
        </div>
      </div>
      <div className="classement-container">
        {Object.entries(movieRated).map((movie) => {
          return (
            <div
              className="movies-rated-container"
              id={movie[1].idRate}
              style={{
                backgroundImage: ` linear-gradient(
                  rgba(121, 8, 59, 0.4),
                  rgba(7, 15, 74, 0.4) 
                ), url(${
                  "https://image.tmdb.org/t/p/w500/" + movie[1].picture
                })`,
              }}>
              <div className="movie-name"> {movie[1].name}</div>
              <div className="movie-name"> {movie[1].rate} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
