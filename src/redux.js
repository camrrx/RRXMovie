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

const displayMovieRating = createSlice({
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

export const store = configureStore({
    reducer:
    {
        movieSelected: movieSelectedSlice.reducer,
        isDisplay : displayMovieRating.reducer

}});