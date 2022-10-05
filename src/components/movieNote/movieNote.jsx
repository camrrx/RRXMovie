import React, { useEffect } from "react";
import "./movieNote.css";
import { useDispatch, useSelector } from "react-redux";
import ListMovies from "../listMovies/listMovies";

const MovieNote = (props) => {
  //const [movie, setMovie] = useState({});
  const movieSelected = useSelector((state) => state.movieSelected);
  const dispatch = useDispatch();

  useEffect(() => {
    //getting the list of movies from search component
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
          src={
            "https://image.tmdb.org/t/p/original/" + movieSelected.poster_path
          }
          alt=""
        />
      </div>
      <div className="info-container">
        <button
          className="button-close"
          onClick={() => {
            dispatch({
              type: "isDisplay/dontDisplayModal",
              payload: false,
            });
          }}>
          <span className="material-icons">clear</span>
        </button>
        <div className="title-container">
          <h1>{movieSelected.title}</h1>
        </div>
        <div className="description-container">
          <p>{movieSelected.overview}</p>
        </div>
        <div className="rating-container"></div>
      </div>
    </div>
  );
};

export default MovieNote;
