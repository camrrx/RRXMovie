import React, { useEffect, useState } from "react";
import "./listMovies.scss";
import MovieNote from "../movieNote/movieNote";
import { useDispatch, useSelector } from "react-redux";

export const ListMovies = (props) => {
  const [movies, setMovies] = useState({});
  const movieSelected = useSelector((state) => state.movieSelected);
  const isDisplay = useSelector((state) => state.isDisplay);

  const dispatch = useDispatch();

  //useEffect -> function which triggered before rendering
  //if second parameter change, use effect will be reload
  useEffect(() => {
    //getting the list of movies from search component
    setMovies(props.moviesParam);

    //if the modal is displayed, scrolling on list movies is NOT possible
    if (isDisplay) {
      document.getElementById("listMovies").style.overflow = "no-scroll";
    } else {
      document.getElementById("listMovies").style.overflow = "scroll";
    }
  }, [props.moviesParam]);

  //function to get the movies with a poster
  const filmCover = () => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  return (
    <div>
      <div className="movies-list" id="listMovies">
        {movies.length
          ? filmCover().map((movie) => (
              <div key={movie.id} className="card">
                <div className="poster-container">
                  <img
                    className="poster-path"
                    src={
                      "https://image.tmdb.org/t/p/original/" + movie.poster_path
                    }
                    alt=""
                  />
                </div>
                <div className="card-body">
                  <button
                    onClick={() => {
                      //On click, store the movie selected and display the modal to rate
                      dispatch({
                        type: "movieSelected/addMovie",
                        payload: movie,
                      });
                      dispatch({
                        type: "isDisplay/displayModal",
                        payload: true,
                      });
                    }}
                    className="button-select">
                    {movie.title}
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>

      {
        //if isDisplay is true, display the MovieNote component related to the movie selected
        isDisplay ? (
          <div className="movie-note">
            <MovieNote movieParam={movieSelected}></MovieNote>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
};
export default ListMovies;
