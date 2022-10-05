import { configureStore } from "@reduxjs/toolkit";
import movieSelectedSlice from "./redux"
import displayMovieRating from  "./redux"

export default configureStore({
    reducer: {
        movieSelected: movieSelectedSlice,
        isDisplay : displayMovieRating

    }
})