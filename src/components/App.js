import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=56b1c85e";

const App = () => {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=56b1c85e`)
      .then(response => response.json)
      .then(jsonResponse => {
        if (jsonResponse.Response === "true") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      })
  }

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <div className="movies">
        <h1>Filmes</h1>
      </div>
    </div>
  )
}

export default App;
