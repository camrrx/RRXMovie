import "./BottomMenu.scss";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { AiTwotoneHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BottomMenu = () => {
	const usernameLogin = useSelector(state => state.loginUser.usernameLogin);

	return (
		<>
			<div className="bottomMenu-container">
				<Link to={"/accueil"}>
					<AiTwotoneHome className="icon-bottomMenu" />
				</Link>
				<Link to={"/home"}>
					<FaSearch className="icon-bottomMenu" />
				</Link>
				{usernameLogin && (
					<Link to={"/profile?user=" + usernameLogin}>
						<FaUserAlt className="icon-bottomMenu" />
					</Link>
				)}
			</div>
		</>
	);
};

export default BottomMenu;
