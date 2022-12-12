import React, { useState, useEffect } from "react";
import "./profile.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import LoginButton from "../loginButton/loginButton";
import logo from "../../img/rrxLogo.png";

const Profile = (props) => {
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
      setMovieRated(res);
    });
    console.log(movieRated);
  }, [props, usernameLogin]);

  const getMovieRated = async (idUser) => {
    try {
      let res = axios.get(API_MOVIE_RATED_URL + "/" + idUser, config);
      console.log("res", res);
      return res;
    } catch (err) {
      console.log("error register", err);
    }
  };
  return (
    <div id="profile">
      <div className="header-container">
        <div className="title-container">
          <div>
            <img className="logo-rrx" src={logo} alt="" />{" "}
          </div>

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
      <div>
        {movieRated.data.forEach((movie) => {
          return <div>{movie.name}</div>;
        })}
      </div>
    </div>
  );
};

export default Profile;
