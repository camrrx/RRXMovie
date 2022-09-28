import React, { useEffect, useState } from 'react';

const ListMovies = (props) => {
	const [ movies, setMovies ] = useState({});

	//useEffect -> function which triggered before rendering
	//if second parameter change, use effect will be reload
	useEffect(
		() => {
			//getting the list of movies from search component
			setMovies(props.moviesParam);
			console.log(props.moviesParam);
		},
		[ props.moviesParam ]
	);

	//let moviesTitle = Search();
	console.log('List movies', movies);

	return <div>{movies.map((movie) => (movie ? <h2>{movie.title}</h2> : ''))}</div>;
};

export default ListMovies;
