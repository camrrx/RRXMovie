import React, { useEffect, useState } from "react";
import { getMovies } from "../../API/tmdbApi";
import ListMovies from "../listMovies/listMovies";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
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
  }, []);

  //event to update researchMovie when the 'input' is modified (onChange)
  const handleNewResearch = (research) => {
    setResearchingMovie(research.target.value);
    // console.log("test", researchingMovie.length);
    // if (researchingMovie.length) {
    //   search();
    // }
  };

  const search = () => {
    getMovies(researchingMovie).then((movies) => {
      setAllMovies(movies);
    });
  };

  const searchFromKey = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div>
      <div className="top-container">
        <div className="research-zone">
          <input
            type="search"
            defaultValue={movieResearch}
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
