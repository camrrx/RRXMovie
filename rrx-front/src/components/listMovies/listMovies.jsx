import React, { useEffect, useState } from "react";
import "./listMovies.scss";
import MovieNote from "../movieNote/movieNote";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const ListMovies = (props) => {
  const [movies, setMovies] = useState({});
  const title_movie = new URLSearchParams(useLocation().search).get(
    "titleMovie"
  );
  const movie_id = new URLSearchParams(useLocation().search).get("movie_id");

  const dispatch = useDispatch();

  //useEffect -> function which triggered before rendering
  //if parameter into [] change, use effect will be reload
  useEffect(() => {
    setMovies(props.moviesParam);
    //If the modal is displayed, scrolling on list movies is NOT possible
    if (movie_id) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      document.getElementById("listMovies").style.overflow = "no-scroll";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "scroll";
      document.getElementById("listMovies").style.overflow = "scroll";
    }
  }, [props.moviesParam, movie_id]);

  /*Get the movies with a poster*/
  const filmCover = () => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  return (
    <div>
      <div className="movies-list" id="listMovies">
        {movies.length ? (
          filmCover().map((movie) => (
            <Link
              key={movie.id}
              to={
                "/search?titleMovie=" + title_movie + "&movie_id=" + movie.id
              }>
              <div className="card">
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
                      // dispatch({
                      // 	type: "isDisplay/displayModal",
                      // 	payload: true,
                      // });
                    }}
                    className="button-select">
                    {movie.title}
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No movie available...</p>
        )}
      </div>

      {
        //If isDisplay is true, display the MovieNote component related to the movie selected
        movie_id ? (
          <div className="movie-note">
            <MovieNote
              movie_id={movie_id}
              title_movie={title_movie}></MovieNote>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
};
export default ListMovies;
