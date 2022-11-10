//Stateless Functional Component (scf to create easily the function)
import "./home.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import background from "../../img/interstellar2.jpeg";
import LoginButton from "../loginButton/loginButton";

const Home = () => {
  const dispatch = useDispatch();
  const [research, setResearch] = useState("");
  const [openButton, setOpenButton] = useState(false);
  const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);
  const successLogin = useSelector((state) => state.loginUser.successLogin);

  useEffect(() => {
    if (openButton) {
      document.getElementById("buttonSignIN").style.display = "none";
    } else if (!successLogin) {
      document.getElementById("buttonSignIN").style.display = "initial";
    }
  }, [openButton, successLogin]);

  const handleResearch = (event) => {
    setResearch(event.target.value);
  };

  const handleOpen = () => {
    setOpenButton(!openButton);
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
              <h1 className="title">RrX | </h1>
            </div>

            <div id="text-movie">
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
