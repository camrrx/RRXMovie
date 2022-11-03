import { configureStore, createSlice } from "@reduxjs/toolkit";
import { registerUser } from './userActions/userActions'

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

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        userInfo: null,
        userToken: null,
        error: null,
        success: false
    },
    reducers: {},
    extraReducers:{
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
          },
          [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
          },
          [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
          },
    }
});

export const store = configureStore({
    reducer:
    {
        movieSelected: movieSelectedSlice.reducer,
        isDisplay: displayMovieRatingSlice.reducer,
        movieResearch: getResearchSlice.reducer,
        user:userSlice.reducer

}});