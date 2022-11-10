import React, { useEffect } from "react";
import "./movieNote.scss";
import { useDispatch, useSelector } from "react-redux";
import ListMovies from "../listMovies/listMovies";
import "../search/search.scss";

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

  //function used to to the dynamic slider
  const dynamicSlider = (valueSlider) => {
    const active = "rgba(121,8,59,1)";
    const inactive = "#dbdbdb";

    const newBackgroundStyle = `linear-gradient(90deg, ${active} 0% ${
      valueSlider * 10
    }%, ${inactive} ${valueSlider * 10}% 100%)`;

    document.getElementById("dynamicRange").style.background =
      newBackgroundStyle;
  };

  return (
    <div
      id="modal-container-id"
      className="modal-container"
      style={{
        backgroundImage: `url(${
          "https://image.tmdb.org/t/p/original/" + movieSelected.backdrop_path
        })`,
      }}>
      <div id="poster-container-id" className="poster-container"></div>
      <div className="info-container">
        <div id="button-container-id" className="button-container">
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

        <div id="title-movie-id" className="title-movie-container">
          <h1>{movieSelected.title}</h1>
        </div>
        {/* <div id="description-movie-id" className="description-container">
          <p>{movieSelected.overview}</p>
        </div> */}
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
        <div className="container-rating-movie">
          <button className="button-to-rate">
            <h1 className="rating-movie">{valueSlider}</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieNote;
