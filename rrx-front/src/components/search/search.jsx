import React, { useEffect, useState } from "react";
import { getMovies } from "../../API/tmdbApi";
import ListMovies from "../listMovies/listMovies";
import LoginButton from "../loginButton/loginButton";

import "./search.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = (props) => {
  //useState is used to modify in direct a state
  //state for the researcher
  const movieResearch = useSelector((state) => state.movieResearch);
  const [researchingMovie, setResearchingMovie] = useState("");

  //state for getting all the movies from the api
  const [allMovies, setAllMovies] = useState([]);

  //if second parameter change, use effect will be reload
  useEffect(() => {
    //getting the list of movies from search component
    setResearchingMovie(movieResearch);
    if (movieResearch.length) {
      search(movieResearch);
    }
  }, [props.moviesParam, movieResearch, setResearchingMovie]);

  //event to update researchMovie when the 'input' is modified (onChange)
  const handleNewResearch = (research) => {
    setResearchingMovie(research.target.value);
  };

  const search = (movie) => {
    getMovies(movie).then((movies) => {
      setAllMovies(movies);
    });
  };

  const searchFromKey = (event) => {
    if (event.key === "Enter") {
      search(researchingMovie);
    }
  };

  return (
    <div>
      <div className="search-container" id="searchContainerId">
        <Link to="/home">
          <div className="title-container">
            <h1 id="title-rrx" className="title">
              RrX |{" "}
            </h1>
            <div id="text-movie">
              <p>
                <small>The</small> Movie Ratings
              </p>
            </div>
          </div>
        </Link>

        <div className="research-zone">
          <input
            type="search"
            defaultValue={movieResearch}
            className="researching"
            onChange={handleNewResearch}
            onKeyPress={(e) => searchFromKey(e)}></input>

          <button
            className="button-search"
            onClick={() => {
              search(researchingMovie);
            }}>
            <span className="material-icons">search</span>
          </button>
        </div>

        <div id="search-header-sign-in-id" className="search-header-sign-in">
          <LoginButton />
        </div>
      </div>
      <div>
        <ListMovies moviesParam={allMovies ? allMovies : []} />
      </div>
    </div>
  );
};

export default Search;