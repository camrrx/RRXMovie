import React, { useState } from "react";
import { getMovies } from "../../API/tmdbApi";
import ListMovies from "../listMovies/listMovies";
import "./search.css";

export const Search = () => {
  //useState is used to modify in direct a state
  //state for the researcher
  const [researchingMovie, setResearchingMovie] = useState("");

  //state for getting all the movies from the api
  const [allMovies, setAllMovies] = useState([]);

  //event to update researchMovie when the 'input' is modified (onChange)
  const handleNewResearch = (research) => {
    setResearchingMovie(research.target.value);
    //console.log("Title handle new research", allMovies);
  };

  const search = () => {
    console.log(researchingMovie);
    getMovies(researchingMovie).then((movies) => {
      setAllMovies(movies);
      console.log("movies : ", allMovies);
    });
  };

  const searchFromKey = (event) => {
    if ((event.key = "Enter")) {
      search();
    }
  };
  return (
    <div>
      <div className="top-container">
        <div className="research-zone">
          <input
            type="search"
            className="researching"
            onChange={handleNewResearch}
            onKeyPress={(e) => searchFromKey(e)}
          />
          <button className="button-search" onClick={search}>
            <span className="material-icons">search</span>
          </button>
        </div>
      </div>
      <div>
        <ListMovies moviesParam={allMovies ? allMovies : []} />
      </div>
    </div>
  );
};

export default Search;
