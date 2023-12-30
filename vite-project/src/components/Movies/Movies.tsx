import { useState } from "react";
import { MovieCards } from "../MovieCards/MovieCards";
import { InputForm } from "../InputForm/InputForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";



const initialFormvalues = {
  id: 0,
  moviePoster: "",
  movieTitle: "",
  movieGenre: "",
  movieReleaseYear: "",
  movieTrailer: "",
};

export type Movie = typeof initialFormvalues;

const Movies = () => {
    const queryClient = useQueryClient()

    const [inputForm, setInputForm] = useState(initialFormvalues);
    const [editMode, setEditMode] = useState<Movie | null>(null);
    const aa = useParams()
    const { id } = useParams();
    console.log("id from TOP", id, "aa value:", aa)
  
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputForm({
        ...inputForm,
        [e.target.name]: e.target.value,
      });
    };
  
    const newMovieMutation = useMutation({
      mutationFn: (movie) => {
        return axios.post("http://localhost:3001/movie", movie).then(() => {
          queryClient.invalidateQueries(["movies"]) ;
        });
      }, 
    });
  
    const handleAddMovie = () => {
      //Jāpārveido releaseYear keya value uz ciparu no string
      const movieToAdd = {
        ...inputForm,
        movieReleaseYear: parseInt(inputForm.movieReleaseYear, 10),
      };
    
      newMovieMutation.mutate(movieToAdd);
    };
    
    const deleteMovieMutation = useMutation({
      mutationFn: (movieId) => {
      return axios.delete(`http://localhost:3001/movies/${movieId}`).then(() => {
        queryClient.invalidateQueries(["movies"]) ;
      });
      }
    })
  
    const handleDelete = (movieId: number) => {
     deleteMovieMutation.mutate(movieId)
    };
  
    const editMovieMutation = useMutation({
      mutationFn: (id: number, editedMovie: Movie) => {
        return axios.put(`http://localhost:3001/movies/${id}`, editedMovie).then(() => {
          queryClient.invalidateQueries(["movies"]);
      });
      }
    })
  
    const handleEdit = (id: number, editedMovie: Movie) => {
      editMovieMutation.mutate(id, editedMovie)
    };
    
    const getMovies = useQuery({
      queryKey: ["movies"],
      queryFn: () => {
        return axios.get("http://localhost:3001/movies")
          .then((response) => {
            // if (!(response.status >= 200 && response.status < 300)) {
            //   throw Error("Could not fetch the data");
            // }
              console.log("getMovies inside the useQuery:", response.data)
              return response.data;
        });
      },
    });
    console.log("Outside useQuery:", getMovies.data)
  
    const getMovieByID = useQuery({
      queryKey: ["movies", id],
      queryFn: () => {
        return axios.get(`http://localhost:3001/movies/${id}`)
          .then((response) => {
            return response.data;
          });
      },
    });
    console.log("Get Movie by ID:", getMovieByID.data)
  



    return (    
        <>
        {(getMovies.isLoading) ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <MovieCards
                moviesArray={getMovies.data.movies}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editedMovie={editMode}
                setEditMode={setEditMode}
              />
              <InputForm
                onInputChange={handleInputChange}
                onMovieAdd={handleAddMovie}
                inputForm={inputForm}
              />
            </>
          )}
        </>
    );
}

export default Movies