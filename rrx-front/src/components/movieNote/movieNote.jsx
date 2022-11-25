import React, { useEffect, useState } from "react";
import "./movieNote.scss";
import { useDispatch, useSelector } from "react-redux";
import "../search/search.scss";
import { getMovieCredits } from "../../API/tmdbApi";
import { getMovieDetails } from "../../API/tmdbApi";
import silhouette from "../../img/silhouette.png";

const MovieNote = (props) => {
  const movieSelected = useSelector((state) => state.movieSelected);
  const [valueSlider, setValueSlider] = React.useState(5);
  const [castMovie, setCastMovie] = useState({});
  const [characterActor, setCharacterActor] = useState("");
  const [detailsMovie, setDetailsMovie] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dynamicSlider(valueSlider);

    if (movieSelected) {
      getCastMovie(movieSelected.id);
      getDetailsMovie(movieSelected.id);
    }
  }, [props, valueSlider, movieSelected]);

  /*Creation of the dynamic slider*/
  const dynamicSlider = (valueSlider) => {
    const active = "rgba(121,8,59,1)";
    const inactive = "#dbdbdb";

    const newBackgroundStyle = `linear-gradient(90deg, ${active} 0% ${
      valueSlider * 10
    }%, ${inactive} ${valueSlider * 10}% 100%)`;

    document.getElementById("dynamicRange").style.background =
      newBackgroundStyle;
  };

  /*Get the casting of the movie and set it into a state*/
  const getCastMovie = (idMovie) => {
    getMovieCredits(idMovie).then((casting) => {
      setCastMovie(casting.cast);
    });
  };

  /*Choose if we'll display the actor or the character depending on a click action*/
  const actorOrCharacter = (person) => {
    console.log(person);
    let element = document.getElementById("actor-card-" + person.id);
    let res;
    element.innerHTML === person.name
      ? (res = person.character)
      : (res = person.name);

    element.innerHTML = res;
    console.log(element);
    // characterActor === person.actor
    //   ? setCharacterActor(person.character)
    //   : setCharacterActor(person.name);
  };

  const displayActorCard = () => {
    return Object.keys(castMovie).map((key) => {
      let person = castMovie[key];
      return (
        <div key={person.id}>
          <div className="casting-container">
            <div className="casting-img">
              <img
                src={
                  person.profile_path
                    ? "https://image.tmdb.org/t/p/w780" + person.profile_path
                    : silhouette
                }
                alt=""
              />
            </div>

            <div className="casting-actor-container">
              <div
                id={"actor-card-" + person.id}
                className="casting-actor-div"
                onClick={() => {
                  console.log(characterActor);
                  actorOrCharacter(person);
                }}>
                {person.name}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  /*Get the details of the movie and set it into a state*/
  const getDetailsMovie = (idMovie) => {
    getMovieDetails(idMovie).then((details) => {
      console.log(details);

      setDetailsMovie(details);
    });
  };

  return (
    <div id="modal-container-id" className="modal-container">
      <div className="background-modal-overlay"></div>

      <img
        className="background-modal"
        src={
          "https://image.tmdb.org/t/p/original/" + movieSelected.backdrop_path
        }
        alt=""
      />
      <div className="info-container">
        <div id="button-container-id" className="button-container">
          <button
            className="button-close"
            onClick={() => {
              dispatch({
                type: "isDisplay/dontDisplayModal",
                payload: false,
              });
              dispatch({
                type: "movieSelected/addMovie",
                payload: {},
              });
            }}>
            <span className="material-icons">clear</span>
          </button>
        </div>

        <div className="movie-and-genre-container">
          <div id="title-movie-id" className="title-movie-container">
            {movieSelected.title}
          </div>
          <div className="genre-container">
            {detailsMovie.genres
              ? detailsMovie.genres.map((genre, index) => {
                  return (
                    <div className="details-movie-genre">{genre.name}</div>
                  );
                })
              : ""}
          </div>
          <div className="description-container">
            {movieSelected.overview ? (
              <p>{movieSelected.overview} </p>
            ) : (
              <p>This movie does not have any description</p>
            )}
          </div>
        </div>

        <div className="actor-card-container">
          <div className="casting-movie-container">{displayActorCard()}</div>
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
