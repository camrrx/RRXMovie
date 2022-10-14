import React, { useEffect } from "react";
import "./movieNote.css";
import { useDispatch, useSelector } from "react-redux";
import ListMovies from "../listMovies/listMovies";

const MovieNote = (props) => {
  //const [movie, setMovie] = useState({});
  const movieSelected = useSelector((state) => state.movieSelected);
  const dispatch = useDispatch();
  const [valueSlider, setValueSlider] = React.useState(5);
  useEffect(() => {
    //getting the list of movies from search component
    dynamicSlider(valueSlider);
  }, [props.movieParam]);

  // const descriptionMovie = (description) => {
  //   if (!description) {
  //     return "This movie does not have description";
  //   }
  //   return description.length < 280
  //     ? description
  //     : description.substring(0, 280) + "[...]";
  // };
  const dynamicSlider = (valueSlider) => {
    const active = "#008000";
    const inactive = "#dbdbdb";

    const newBackgroundStyle = `linear-gradient(90deg, ${active} 0% ${
      valueSlider * 10
    }%, ${inactive} ${valueSlider * 10}% 100%)`;

    document.getElementById("dynamicRange").style.background =
      newBackgroundStyle;
  };

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
        <div className="button-container">
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
        </div>

        <div className="title-container">
          <h1>{movieSelected.title}</h1>
        </div>
        <div className="description-container">
          <p>{movieSelected.overview}</p>
        </div>
        <div className="slidecontainer">
          <input
            id="dynamicRange"
            className="slider"
            type="range"
            min="0"
            max="10"
            value={valueSlider}
            onChange={(e) => {
              setValueSlider(e.target.value);
              dynamicSlider(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieNote;
