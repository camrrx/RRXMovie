import { configureStore, createSlice } from "@reduxjs/toolkit";

const movieSelectedSlice = createSlice({
    name: "movieSelected",
    initialState: {},
    reducers: {
        addMovie: (state, action) => {
            //action : {type : "movieSelected/addMovie", payload:{title:"", description:""....}}
            return state = action.payload;
        },
        removeMovie: (state, action) => {
            state = {};
        }
    }
});

const displayMovieRatingSlice = createSlice({
    name: "isDisplay",
    initialState: false,
    reducers: {
        displayModal: (state, action) => {
            return state = true;
        },
        dontDisplayModal: (state, action) => {
            return state = false;
        }
    }
});

const getResearchSlice = createSlice({
    name: "movieResearch",
    initialState: "",
    reducers: {
        getMovie: (state, action) => {
            return state = action.payload.research;
        },
    }
});

const userRegisterSlice = createSlice({
    name: "registerUser",
    initialState: {
        username: "",
        email: "",
        password: "",
        success: false
    },
    reducers: {
        fillRegisterForm: (state, action) => {
            state = {
                email: action.payload.email,
                username: action.payload.username,
                password: action.payload.password
            }
            console.log("state",state)

            return state;
        }
    },
});

const userLoginSlice = createSlice({
    name: "loginUser",
    initialState: {
        usernameLogin: "",
        emailLogin: "",
        passwordLogin: "",
        successLogin: false
    },
    reducers: {
        fillLoginForm: (state, action) => {
            state = {
                usernameLogin: action.payload.username,
                passwordLogin: action.payload.password
            }
            return state;
        }, 
    },
});

export const store = configureStore({
    reducer:
    {
        movieSelected: movieSelectedSlice.reducer,
        isDisplay: displayMovieRatingSlice.reducer,
        movieResearch: getResearchSlice.reducer,
        registerUser:userRegisterSlice.reducer,
        loginUser:userLoginSlice.reducer,

}});