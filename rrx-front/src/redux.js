import { configureStore, createSlice } from "@reduxjs/toolkit";

const movieSelectedSlice = createSlice({
	name: "movieSelected",
	initialState: {},
	reducers: {
		addMovie: (state, action) => {
			//action : {type : "movieSelected/addMovie", payload:{title:"", description:""....}}
			return (state = action.payload);
		},
		removeMovie: (state, action) => {
			state = {};
		},
	},
});

const displayMovieRatingSlice = createSlice({
	name: "isDisplay",
	initialState: false,
	reducers: {
		displayModal: (state, action) => {
			return (state = true);
		},
		dontDisplayModal: (state, action) => {
			return (state = false);
		},
	},
});

const getResearchSlice = createSlice({
	name: "movieResearch",
	initialState: "",
	reducers: {
		getMovie: (state, action) => {
			return (state = action.payload.research);
		},
	},
});

const userLoginSlice = createSlice({
	name: "loginUser",
	initialState: {},
	reducers: {
		getLoginData: (state, action) => {
			state = {
				usernameLogin: action.payload.usernameLogin,
				successLogin: action.payload.successLogin,
			};
			return state;
		},

		logout: (state, action) => {
			state = {
				usernameLogin: "",
				successLogin: false,
			};
			return state;
		},
	},
});

export const store = configureStore({
	reducer: {
		movieSelected: movieSelectedSlice.reducer,
		isDisplay: displayMovieRatingSlice.reducer,
		movieResearch: getResearchSlice.reducer,
		loginUser: userLoginSlice.reducer,
	},
});
