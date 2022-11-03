//Stateless Functional Component (scf to create easily the function)
import "./home.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import background from "../../img/interstellar2.jpeg";

const Home = () => {
  const dispatch = useDispatch();
  const [research, setResearch] = useState("");
  const [openButton, setOpenButton] = useState(false);
  useEffect(() => {
    if (openButton) {
      document.getElementById("buttonSignIN").style.display = "none";
    } else {
      document.getElementById("buttonSignIN").style.display = "initial";
    }
  }, [openButton]);

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

          <div className="header-end">
            <button id="buttonSignIN" onClick={handleOpen}>
              Sign In
            </button>
            {openButton ? (
              <ul className="buttonMenu">
                <li className="menu-item">
                  <Link to="/login">
                    <button>Log in</button>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/register">
                    <button>Register</button>
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        {/* <img src={require("./interstellar.jpg")} alt="interstellar" /> */}
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
