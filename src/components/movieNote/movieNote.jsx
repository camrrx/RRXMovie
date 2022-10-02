import React, { useEffect, useState } from "react";
import "./movieNote.css";

const MovieNote = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //getting the list of movies from search component
    setMovie(props.movieParam);
    console.log(props.movieParam);
  }, [props.movieParam]);

  // const descriptionMovie = (description) => {
  //   if (!description) {
  //     return "This movie does not have description";
  //   }
  //   return description.length < 280
  //     ? description
  //     : description.substring(0, 280) + "[...]";
  // };

  return (
    <div className="modal-container">
      <div className="poster-container">
        <img
          className="poster"
          src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
          alt=""
        />
      </div>
      <div className="info-container">
        <div className="title-container">
          <h1>{movie.title}</h1>
        </div>
        <div className="description-container">
          <p>{movie.overview}</p>
        </div>
        <div className="rating-container"></div>
      </div>
    </div>
  );
};

export default MovieNote;
