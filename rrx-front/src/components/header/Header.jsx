import React from "react";
import "./Header.scss";
import LoginButton from "../loginButton/loginButton";
import logo from "../../img/rrxLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="header-container">
			<div className="title-container">
				<Link to="/home">
					<div>
						<img className="logo-rrx" src={logo} alt="" />
					</div>
				</Link>
			</div>

			<div className="header-end">
				<LoginButton />
			</div>
		</div>
	);
};

export default Header;
