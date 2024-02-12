import "./Accueil.scss";
import {
	getTopRatedMovies,
	getNowPlayingMovies,
	getUpComingMovies,
} from "../../API/tmdbApi";
import { useEffect, useState } from "react";
import { RadioGroupBasic } from "../../componentsBasic/RadioGroup/RadioGroup";

const Accueil = () => {
	const [moviesToDisplay, setMoviesToDisplay] = useState();

	const [movieClicked, setMovieClicked] = useState();
	const [selectedTab, setSelectedTab] = useState("value1");

	const getTopRatedMoviesFromTmdb = async () => {
		await getTopRatedMovies().then(movie => {
			setMoviesToDisplay(movie.results);
			setMovieClicked(movie.results[0]);
		});
	};
	const getNowPlayingMoviesFromTmdb = async () => {
		await getNowPlayingMovies().then(movie => {
			setMoviesToDisplay(movie.results);
			setMovieClicked(movie.results[0]);
		});
	};

	const getUpComingMoviesFromTmdb = async () => {
		await getUpComingMovies().then(movie => {
			setMoviesToDisplay(movie.results);
			setMovieClicked(movie.results[0]);
		});
	};

	useEffect(() => {
		switch (selectedTab) {
			case "value1":
				getUpComingMoviesFromTmdb();
				break;
			case "value2":
				getNowPlayingMoviesFromTmdb();
				break;
			case "value3":
				getTopRatedMoviesFromTmdb();
				break;
			default:
				break;
		}
	}, [selectedTab]);

	const getMovieClicked = movie => {
		setMovieClicked(movie);
	};
	return (
		<div>
			<div className="title-container">
				<RadioGroupBasic onValueChange={newValue => setSelectedTab(newValue)} />
			</div>
			<div className="cards-popular-movies">
				{moviesToDisplay &&
					moviesToDisplay.map(movie => (
						<div
							className="cards-popular-movies__card"
							key={movie.id}
							onClick={() => getMovieClicked(movie)}>
							<img
								className="cards-popular-movies__card__poster-path"
								src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
								alt=""
							/>
						</div>
					))}
			</div>
			<div>
				{movieClicked && (
					<div className="cards-popular-movies__description">
						<img
							className="cards-popular-movies__description__img"
							src={
								"https://image.tmdb.org/t/p/original/" +
								movieClicked.backdrop_path
							}
							alt=""
						/>
						<div className="cards-popular-movies__description__overview">
							<h1 className="cards-popular-movies__description__overview__title">
								{movieClicked.title.toUpperCase()}
							</h1>
							<h3 className="cards-popular-movies__description__overview__releasedate">
								{movieClicked.release_date}
							</h3>
							<h4 className="cards-popular-movies__description__overview__text">
								{movieClicked.overview}
							</h4>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Accueil;
