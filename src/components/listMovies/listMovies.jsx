import React, { useEffect, useState } from "react";
import "./listMovies.css";
import MovieNote from "../movieNote/movieNote";

export const ListMovies = (props) => {
  const [movies, setMovies] = useState({});
  const [card, setCard] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  //useEffect -> function which triggered before rendering
  //if second parameter change, use effect will be reload
  useEffect(() => {
    //getting the list of movies from search component
    setMovies(props.moviesParam);
    console.log(props.moviesParam);
  }, [props.moviesParam]);

  //let moviesTitle = Search();
  //console.log('List movies', movies);

  const filmCover = () => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  const getMovieSelected = () => {
    if (!Object.entries(movieSelected).length) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="movies-list">
        {movies.length
          ? filmCover().map((movie) => (
              <div className={"card" + (card ? "card-bigger" : "")}>
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
                      setMovieSelected(movie);
                    }}
                    className="button-select">
                    {movie.title}
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>

      {getMovieSelected() ? (
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
