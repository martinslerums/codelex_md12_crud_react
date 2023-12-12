import { Movie } from "../../App";
import { Button } from "../Button/Button";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import styles from "./MovieCards.module.css";

type MovieCardsProps = {
  moviesArray: Movie[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number, movie: Movie) => void;
  editedMovie: Movie | null;
  setEditMode: React.Dispatch<React.SetStateAction<Movie | null>>;
};

export const MovieCards = ({moviesArray,handleDelete,handleEdit,editedMovie,setEditMode,}: MovieCardsProps) => {
    
  const startEditMode = (movie: Movie) => {
    setEditMode({
      id: movie.id,
      moviePoster: movie.moviePoster,
      movieTitle: movie.movieTitle,
      movieGenre: movie.movieGenre,
      movieReleaseYear: movie.movieReleaseYear,
      movieTrailer: movie.movieTrailer,
    });
  };

  const cancelEditMode = () => {
    setEditMode(null);
  };

  const saveEditMode = () => {
    if (editedMovie) {
      handleEdit(editedMovie.id, editedMovie);
      setEditMode(null);
    }
  };

  return (
    <div className={styles.movieCards}>
      {moviesArray.map((movie: Movie) => (
        <div className={styles.moviePreview} key={movie.id}>
          <MoviePoster src={movie.moviePoster} alt={movie.movieTitle} />
          <h3>{movie.movieTitle}</h3>
          <span>{movie.movieGenre}</span>
          <span>{movie.movieReleaseYear}</span>
          <br />
          <div>
            <Button text="Delete" onClick={() => {handleDelete(movie.id)}}/>
            <Button text="Edit" onClick={() => startEditMode(movie)}/>
          </div>
        </div>
      ))}
      {editedMovie && (
        <div className={styles.editForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEditMode();
            }}
          >
            <h1>EDIT MOVIE</h1>
            <input
              type="text"
              value={editedMovie.moviePoster}
              onChange={(e) =>
                setEditMode({
                  ...editedMovie,
                  moviePoster: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editedMovie.movieTitle}
              onChange={(e) =>
                setEditMode({
                  ...editedMovie,
                  movieTitle: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editedMovie.movieGenre}
              onChange={(e) =>
                setEditMode({
                  ...editedMovie,
                  movieGenre: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editedMovie.movieReleaseYear}
              onChange={(e) =>
                setEditMode({
                  ...editedMovie,
                  movieReleaseYear: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editedMovie.movieTrailer}
              onChange={(e) =>
                setEditMode({
                  ...editedMovie,
                  movieTrailer: e.target.value,
                })
              }
            />
            <div>
              <Button type="button" text="Cancel" onClick={cancelEditMode} />
              <Button type="submit" text="Save" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
