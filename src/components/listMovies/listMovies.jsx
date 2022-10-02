import React, { useEffect, useState } from "react";
import "./listMovies.css";

const ListMovies = (props) => {
  const [movies, setMovies] = useState({});
  const [card, setCard] = useState(false);

  //useEffect -> function which triggered before rendering
  //if second parameter change, use effect will be reload
  useEffect(() => {
    //getting the list of movies from search component
    setMovies(props.moviesParam);
    console.log(props.moviesParam);
  }, [props.moviesParam]);

  //let moviesTitle = Search();
  //console.log('List movies', movies);

  const descriptionMovie = (description) => {
    if (!description) {
      return "This movie does not have description";
    }
    return description.length < 280
      ? description
      : description.substring(0, 280) + "[...]";
  };

  const filmCover = () => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  return (
    <div className="movies-list">
      {movies.length
        ? filmCover().map((movie) => (
            <div className={"card" + (card ? "card-bigger" : "")}>
              <img
                className="poster-path"
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <div className="description-container">
                  <p onClick={() => setCard(true)} class="card-text">
                    {descriptionMovie(movie.overview)}
                  </p>
                </div>
                <button className="btn btn-dark">Select {movie.title}</button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
export default ListMovies;
