import React, { Component } from "react";
import "./App.css";
import Search from "./components/search/search";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useSelector } from "react-redux";

function App() {
	const loginUserData = useSelector((state) => state.loginUser);

	return (
		<React.Fragment>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route exact path="*" element={<Home />}></Route>
						<Route exact path="/home" element={<Home />}></Route>
						<Route path="/search" element={<Search />}></Route>
						<Route exact path="/login" element={<Login />}></Route>
						<Route exact path="/register" element={<Register />}></Route>
					</Routes>
				</Router>
			</Provider>
		</React.Fragment>
	);
}

export default App;
