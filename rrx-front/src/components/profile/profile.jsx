import React, { useState, useEffect } from "react";
import "./profile.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import MovieNote from "../movieNote/movieNote";
import Header from "../header/Header";

const Profile = props => {
	//const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);
	const [movieRated, setMovieRated] = useState({});
	const location = useLocation();
	const paramsURL = new URLSearchParams(location.search);
	const getUserURL = paramsURL.get("user");
	const getMovie_id = paramsURL.get("movie_id");

	const API_MOVIE_RATED_URL = "http://localhost:9000/rate";
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	useEffect(() => {
		getMovieRated().then(res => {
			setMovieRated(res.data);
		});

		if (getMovie_id) {
			document.getElementsByTagName("body")[0].style.overflow = "hidden";
			document.getElementById("profileContainer").style.overflow = "no-scroll";
		} else {
			document.getElementsByTagName("body")[0].style.overflow = "auto";
			document.getElementById("profileContainer").style.overflow = "auto";
		}
		// eslint-disable-next-line
	}, []);

	const getMovieRated = async () => {
		try {
			let res = await axios.get(API_MOVIE_RATED_URL + "/" + getUserURL, config);
			return res;
		} catch (err) {
			console.log("error register", err);
		}
	};

	const sortRatedMovies = () => {
		let movieRatedSorted = Object.entries(movieRated).sort(
			(a, b) => b[1].rate - a[1].rate
		);
		return movieRatedSorted;
	};

	// const getBestMovie = () => {
	// 	return sortRatedMovies()[0][1].picture;
	// };

	// const getTitleById = id => {
	// 	let movie = Object.entries(movieRated).find(x => x[1].id_movie === id);
	// 	return movie[1].name;
	// };

	return (
		<div className="profile-container" id="profileContainer">
			<Header />

			<div
				className="classement-container"
				// style={{
				//   backgroundImage: ` linear-gradient(
				//          rgba(0, 0, 0, 0.3),
				//          rgba(0, 0, 0, 0.3)
				//        ),url(${
				//          "https://image.tmdb.org/t/p/original/" + getBestMovie()
				//        })`,
				// }}
			>
				{sortRatedMovies().map(movie => {
					return (
						<Link
							key={movie[1].id_movie}
							to={
								"/profile?user=" + getUserURL + "&movie_id=" + movie[1].id_movie
							}>
							<div
								className="movies-rated-container"
								id={movie[1].idRate}
								style={{
									backgroundImage: ` linear-gradient(
                    rgba(121, 8, 59, 0.4),
                    rgba(7, 15, 74, 0.4)
                  ),
                   url(${"https://image.tmdb.org/t/p/w500/" + movie[1].picture})
                  `,
								}}>
								<div className="movie-name"> {movie[1].name}</div>
								<div className="movie-name"> {movie[1].rate} </div>
							</div>
						</Link>
					);
				})}
			</div>

			{getMovie_id ? (
				//If isDisplay is true, display the MovieNote component related to the movie selected
				<div className="movie-note">
					<MovieNote movie_id={getMovie_id}></MovieNote>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Profile;
