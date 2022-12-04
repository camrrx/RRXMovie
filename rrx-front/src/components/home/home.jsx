//Stateless Functional Component (scf to create easily the function)
import "./home.scss";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import background from "../../img/jungleBook.jpeg";
import LoginButton from "../loginButton/loginButton";
import logo from "../../img/rrxLogoWhite.png";

const Home = () => {
	const dispatch = useDispatch();
	const [research, setResearch] = useState("");

	const handleResearch = (event) => {
		setResearch(event.target.value);
	};

	return (
		<div
			className="home-container"
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<div className="background-home-container">
				<div className="header-container">
					<div className="title-container">
						<div>
							<img className="logo-rrx" src={logo} alt="" />{" "}
						</div>

						<div className="text-movie">
							<p>
								<small>The</small> Movie Ratings App
							</p>
						</div>
					</div>

					<div className="header-end">
						<LoginButton />
					</div>
				</div>
				<form action="/search" className="search-home-container">
					<input
						placeholder="Interstellar, Avatar ..."
						id="movieSearch"
						name="titleMovie"
						className="search-input"
						autoComplete="off"
						type="text"
						onChange={handleResearch}
						required
					/>
					<button
						type="submit"
						className="search-button noSelect"
						onClick={() => {
							//On click, the text written in the input will be store in the redux store to be used in search page
							dispatch({
								type: "movieResearch/getMovie",
								payload: { research },
							});
						}}
					>
						<span className="material-icons">search</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Home;
