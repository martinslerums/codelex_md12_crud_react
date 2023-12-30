import { useParams } from "react-router-dom";
import { Movie } from "../../App";
import { useEffect } from "react";
import { MoviePoster } from "../MoviePoster/MoviePoster";

type MovieDetailsProps = {
  getMovieByID: (id: number) => Promise<Movie>; 
  movie: Movie;
};

  
const MovieDetails = ({ getMovieByID, movie }: MovieDetailsProps) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const parsedId = parseInt(id, 10);
    getMovieByID(parsedId);
  }, [getMovieByID, id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <>
        <MoviePoster src={movie.moviePoster} alt={movie.movieTitle} />
        <h3>{movie.movieTitle}</h3>
        <span>{movie.movieGenre}</span>
        <span>{movie.movieReleaseYear}</span>
      </>
    </div>
  );
};

export default MovieDetails;