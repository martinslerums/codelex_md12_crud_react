import { useState, useEffect } from "react";
import { InputForm } from "./components/InputForm/InputForm";
import { MovieCards } from "./components/MovieCards/MovieCards";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import axios from "axios";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";

const initialFormvalues = {
  id: 0,
  moviePoster: '',
  movieTitle: '',
  movieGenre: '',
  movieReleaseYear: '',
  movieTrailer: ''
}

export type Movie = typeof initialFormvalues


const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [inputForm, setInputForm] = useState(initialFormvalues);
  const [editMode, setEditMode] = useState<Movie | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputForm({
        ...inputForm,
        [e.target.name]: e.target.value,
      });
    }

    const handleMovieAdd = () => {
      axios.post("http://localhost:3004/movies", inputForm).then(() => {
        getMovies();
        setInputForm(initialFormvalues);
      });
    };

    const handleDelete = (id: number) => {
      axios.delete(`http://localhost:3004/movies/${id}`).then(() => {
        getMovies();
      });
    };

    const handleEdit = (id: number, editedMovie: Movie) => {
      axios.put(`http://localhost:3004/movies/${id}`, editedMovie).then(() => {
        getMovies();
        setEditMode(null);
      });
    };

    useEffect(() => {
      getMovies();
    }, []);

    const getMovies = () => {
      axios.get("http://localhost:3004/movies").then((response) => {
        setMovies(response.data);
      });
    };

    return (
      <Router>
        <div>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/movies">
                <MovieCards
                  moviesArray={movies}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  editedMovie={editMode}
                  setEditMode={setEditMode}
                />
                <InputForm
                  onInputChange={handleInputChange}
                  onMovieAdd={handleMovieAdd}
                  inputForm={inputForm}
                />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  };


export default App;
