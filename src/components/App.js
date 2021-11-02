import React, { useReducer, useEffect } from "react";

import Header from './Header';
import Movie from './Movie';
import spinner from '../assets/ajax-loader.gif';
import Search from './Search';
import { initialState, reducer } from "../store/reducer";
import axios from 'axios';

const MOVIE_API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=56b1c85e"

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SERACH_MOVIE_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=56b1c85e`).then(
    jsonResponse => {
      if (jsonResponse.data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIE_SUCCESS",
          payload: jsonResponse.data.Search
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIE_FAILURE",
          error: jsonResponse.data.Error
        });
      }
    }
  );

  return (
    <div className="App">
      APP
    </div>
  )
}

export default App;