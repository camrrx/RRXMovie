import React, { useState } from 'react';
import { getMovies } from '../API/tmdbApi';
import ListMovies from './listMovies';

export const Search = () => {
	//useState is used to modify in direct a state
	//state for the researcher
	const [ researchingMovie, setResearchingMovie ] = useState('');

	//state for getting all the movies from the api
	const [ allMovies, setAllMovies ] = useState([]);

	//event to update researchMovie when the 'input' is modified (onChange)
	const handleNewResearch = (research) => {
		setResearchingMovie(research.target.value);
		console.log('Title handle new research', allMovies);
	};

	const search = () => {
		console.log(researchingMovie);
		getMovies(researchingMovie).then((movies) => {
			setAllMovies(movies);
			console.log('movies : ', allMovies);
		});
	};

	return (
		<div className="input-group">
			<div className="form-outline">
				<input type="search" className="form-control" onChange={handleNewResearch} />
			</div>
			<button className="btn btn-primary" onClick={search}>
				Search
			</button>
			{/* <div>{allMovies && allMovies.lenght ? console.log('Title', allMovies) : console.log('ok')}</div> */}
			<ListMovies moviesParam={allMovies ? allMovies : []} />
		</div>
	);
};

export default Search;
