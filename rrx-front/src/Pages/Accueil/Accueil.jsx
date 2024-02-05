import "./Accueil.scss";
import { getPopularMovies } from "../../API/tmdbApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/rrxLogoWhite.png";

const Accueil = () => {
	const [popularMovies, setPopularMovies] = useState();
	const [movieClicked, setMovieClicked] = useState();

	const getPopularMoviesFromTmdb = async () => {
		await getPopularMovies().then(movie => {
			setPopularMovies(movie.results);
			setMovieClicked(movie.results[0]);
		});
	};

	useEffect(() => {
		getPopularMoviesFromTmdb();
	}, []);

	const getMovieClicked = movie => {
		setMovieClicked(movie);
	};
	return (
		<div>
			<div className="title-container">
				<Link to="/home">
					<div>
						<img className="logo-rrx" src={logo} alt="" />
					</div>
				</Link>
			</div>
			<div className="cards-popular-movies">
				{popularMovies &&
					popularMovies.map(movie => (
						<div
							className="cards-popular-movies__card"
							key={movie.id}
							onClick={() => getMovieClicked(movie)}>
							<img
								className="cards-popular-movies__movies__card__poster_path"
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
