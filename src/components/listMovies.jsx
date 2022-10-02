import React, { useEffect, useState } from "react";

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

  return (
    <div className="movies-list">
      {movies.length
        ? movies.map((movie) => (
            <div className={"card" + (card ? "card-bigger" : "")}>
              <img
					src={"https://image.tmdb.org/t/p/original/" + movie.poster_path
					}
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">{movie.title}</h5>
                <p onClick={() => setCard(true)} class="card-text">
                  {movie.overview.length < 300
                    ? movie.overview
                    : movie.overview.substring(0, 300) + "[...]"}
                </p>
                <button class="btn btn-dark">Select {movie.title}</button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
export default ListMovies;
