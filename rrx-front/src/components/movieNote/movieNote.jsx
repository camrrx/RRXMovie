import React, { useEffect, useState } from "react";
import "./movieNote.scss";
import "../search/search.scss";
import { getMovieCredits } from "../../API/tmdbApi";
import { getMovieDetails } from "../../API/tmdbApi";
import silhouette from "../../img/silhouette.png";
import { Link } from "react-router-dom";

const MovieNote = (props) => {
	const [valueSlider, setValueSlider] = React.useState(5);
	const [castMovie, setCastMovie] = useState({});
	const [characterActor, setCharacterActor] = useState("");
	const [detailsMovie, setDetailsMovie] = useState({});

	useEffect(() => {
		dynamicSlider(valueSlider);

		if (props.movie_id) {
			getCastMovie(props.movie_id);
			getDetailsMovie(props.movie_id);
		}
	}, [props, valueSlider]);

	/*Creation of the dynamic slider*/
	const dynamicSlider = (valueSlider) => {
		const active = "rgba(121,8,59,1)";
		const inactive = "#dbdbdb";

		const newBackgroundStyle = `linear-gradient(90deg, ${active} 0% ${valueSlider * 10}%, ${inactive} ${
			valueSlider * 10
		}% 100%)`;

		document.getElementById("dynamicRange").style.background = newBackgroundStyle;
	};

	/*Get the casting of the movie and set it into a state*/
	const getCastMovie = (idMovie) => {
		getMovieCredits(idMovie).then((casting) => {
			setCastMovie(casting.cast);
		});
	};

	/*Choose if we'll display the actor or the character depending on a click action*/
	const actorOrCharacter = (person) => {
		let element = document.getElementById("actor-card-" + person.id);
		let res;
		element.innerHTML === person.name ? (res = person.character) : (res = person.name);

		element.innerHTML = res;
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
								src={person.profile_path ? "https://image.tmdb.org/t/p/w780" + person.profile_path : silhouette}
								alt=""
							/>
						</div>

						<div className="casting-actor-container">
							<div
								id={"actor-card-" + person.id}
								className="casting-actor-div"
								onClick={() => {
									actorOrCharacter(person);
								}}
							>
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
			setDetailsMovie(details);
		});
	};

	return (
		<div id="modal-container-id" className="modal-container">
			<div className="background-modal-overlay"></div>

			<div className="background-modal">
				<img
					src={
						detailsMovie && detailsMovie.backdrop_path
							? "https://image.tmdb.org/t/p/w500/" + detailsMovie.backdrop_path
							: ""
					}
					alt=""
				/>
			</div>
			<div className="info-container">
				<div id="button-container-id" className="button-container">
					<Link to={"/search?titleMovie=" + props.title_movie}>
						<div className="button-close">
							<span className="material-icons">clear</span>
						</div>
					</Link>
				</div>
				<div className="movie-and-genre-container">
					<div id="title-movie-id" className="title-movie-container">
						{detailsMovie.title}
					</div>
					<div className="genre-container">
						{detailsMovie.genres
							? detailsMovie.genres.map((genre, index) => {
									return (
										<div key={genre.id} className="details-movie-genre">
											{genre.name}
										</div>
									);
							  })
							: ""}
					</div>
				</div>
				<div className="description-container">
					{detailsMovie.overview ? <p>{detailsMovie.overview} </p> : <p>This movie does not have any description</p>}
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
