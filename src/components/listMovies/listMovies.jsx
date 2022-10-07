import React, { useEffect, useState } from "react";
import "./listMovies.css";
import MovieNote from "../movieNote/movieNote";
import { useDispatch, useSelector } from "react-redux";

export const ListMovies = (props) => {
  const [movies, setMovies] = useState({});
  const [card, setCard] = useState(false);
  const movieSelected = useSelector((state) => state.movieSelected);
  const isDisplay = useSelector((state) => state.isDisplay);
  const body = document.body;

  const dispatch = useDispatch();

  //useEffect -> function which triggered before rendering
  //if second parameter change, use effect will be reload
  useEffect(() => {
    //getting the list of movies from search component
    setMovies(props.moviesParam);
    console.log(props.moviesParam);

    if (isDisplay) {
      body.style.overflowY = "hidden";
    }
  }, [props.moviesParam]);

  //let moviesTitle = Search();
  //console.log('List movies', movies);

  const filmCover = () => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  return (
    <div>
      <div className="movies-list">
        {movies.length
          ? filmCover().map((movie) => (
              <div
                key={movie.id}
                className={"card" + (card ? "card-bigger" : "")}>
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
      {isDisplay ? (
        <div className="movie-note">
          <MovieNote movieParam={movieSelected}></MovieNote>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ListMovies;
