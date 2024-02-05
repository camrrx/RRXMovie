import React from "react";
import "./App.css";
import Search from "./components/search/search";
import Home from "./Pages/Home/Home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Profile from "./components/profile/profile";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import BottomMenu from "./components/BottomMenu/BottomMenu";
import Accueil from "./Pages/Accueil/Accueil";

function App() {
	return (
		<React.Fragment>
			<Provider store={store}>
				<Router>
					<div className="app-design">
						<Routes>
							<Route exact path="*" element={<Home />}></Route>
							<Route exact path="/home" element={<Home />}></Route>
							<Route path="/search" element={<Search />}></Route>
							<Route exact path="/login" element={<Login />}></Route>
							<Route exact path="/register" element={<Register />}></Route>
							<Route exact path="/profile" element={<Profile />}></Route>
							<Route exact path="/accueil" element={<Accueil />}></Route>
						</Routes>
						<div className="bottom-menu">
							<BottomMenu />
						</div>
					</div>
				</Router>
			</Provider>
		</React.Fragment>
	);
}

export default App;
