//Stateless Functional Component (scf to create easily the function)
import "./home.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import background from "../../img/jungleBook.jpeg";
import LoginButton from "../loginButton/loginButton";
import logo from "../../img/rrxLogoWhite.png";

const Home = () => {
  const dispatch = useDispatch();
  const [research, setResearch] = useState("");
  const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);
  const successLogin = useSelector((state) => state.loginUser.successLogin);

  const handleResearch = (event) => {
    setResearch(event.target.value);
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${background})`,
      }}>
      <div className="background-home-container">
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

          {!successLogin ? (
            <div className="header-end">
              <LoginButton />
            </div>
          ) : (
            <div className="header-end">
              <button>Hello {usernameLogin}</button>
            </div>
          )}
        </div>
        <form className="search-home-container">
          <input
            placeholder="Interstellar, Avatar ..."
            id="movieSearch"
            className="search-input"
            type="text"
            onChange={handleResearch}
          />

          <Link to="/search">
            <button
              className="search-button"
              onClick={() => {
                //On click, the text written in the input will be store in the redux store to be used in search page
                dispatch({
                  type: "movieResearch/getMovie",
                  payload: { research },
                });
              }}>
              <span className="material-icons">search</span>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Home;
