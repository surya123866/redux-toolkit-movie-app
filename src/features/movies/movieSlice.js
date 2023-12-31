import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`);
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async () => {
      const seriesText = "Friend";
      const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`);
      return response.data;
    }
  );

  export const fetchAsyncMoviesAndShows = createAsyncThunk(
    "movies/fetchAsyncMoviesAndShows",
    async (id) => {
      const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`);
      return response.data;
    }
  );

const initialState = {
  movies: {},
  shows:{},
  selectedMovieOrShow:{},
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow:(state)=>{
        state.selectedMovieOrShow={};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled](state, { payload }) {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled](state, { payload }) {
        console.log("Fetched Successfully");
        return { ...state, shows: payload };
      },
      [fetchAsyncMoviesAndShows.fulfilled](state, { payload }) {
        console.log("Fetched Successfully");
        return { ...state, selectedMovieOrShow: payload };
      },
  },
});

export const { addMovies,removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow
export default movieSlice.reducer;
