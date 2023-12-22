import { useState } from "react";
import "./styles.css";
import Movie from "./components/Movie/index.js";
import Form from "./components/Form";
import { uid } from "uid";

const initialMovieData = [
  {
    id: "28djdh72",
    name: "The Incredible Hulk",
    isLiked: false,
  },
  {
    id: "dknseu2",
    name: "Spiderman 1-25",
    isLiked: false,
  },
  {
    id: "dkwi02ksk",
    name: "Lord of the Rings",
    isLiked: true,
  },
];

export default function App() {
  const [movies, setMovies] = useState(initialMovieData);

  function handleAddMovie(newMovie) {
    // [] --> we want the new state to be an array
    // ...movies --> we spread a copy of the existing movies to new state
    // {id: uid() --> give the new object an id
    // ...newMovie} --> spread a copy of the newMovie object to the new object
    setMovies([...movies, { id: uid(), ...newMovie }]);
  }

  function handleDeleteMovie(id) {
    // we want to remove at least one movie object from the array --> .filter()
    // (movie) => movie.id !== id --> return all movies that don't match the id that is passed in
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function handleToggleLike(id) {
    // we want to update at least one entry in the movies object --> movies.map()
    // movie.id === id --> check if current movie's id matches the id
    // that is passed to the function
    // ? { ...movie, isLiked: !movie.isLiked } --> if the id matches, return a copy
    // of the current movie object and change the isLiked value to its opposite
    // : movie --> otherwise, return the movie as it is
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  return (
    <div className="app">
      <h1>Favorite Movies</h1>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Movie
              name={movie.name}
              isLiked={movie.isLiked}
              id={movie.id}
              onDeleteMovie={handleDeleteMovie}
              onToggleLike={handleToggleLike}
            />
          </li>
        ))}
      </ul>
      <Form onAddMovie={handleAddMovie} />
    </div>
  );
}
