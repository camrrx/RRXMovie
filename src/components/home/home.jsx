//Stateless Functional Component (scf to create easily the function)
import "./home.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const [research, setResearch] = useState("");

  const handleResearch = (event) => {
    setResearch(event.target.value);
  };

  return (
    <div className="home-container">
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
          <button>Sign in</button>
        </div>
      </div>

      <img src={require("./interstellar.jpg")} alt="interstellar" />
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
  );
};

export default Home;
