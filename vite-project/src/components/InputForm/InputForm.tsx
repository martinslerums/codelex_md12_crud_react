import { FormEvent } from "react";
import { Movie } from "../../App";
import styles from './InputForm.module.css'
import { Button } from "../Button/Button";

type InputFormProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMovieAdd: () => void;
  inputForm: Movie
};


export const InputForm = ({ onInputChange, onMovieAdd, inputForm }: InputFormProps) => {

  const handleMovieAdd = (event: FormEvent) => {
      event.preventDefault();
      onMovieAdd();
  }

  return (
    <div className={styles.form__wrapper}>
      <form 
        className={styles.form}
        onSubmit={handleMovieAdd}>
          <div className={styles.input__wrapper}>
            <label className={styles.label}>Movie poster:</label>
            <input
              className={styles.input} 
              type="text"
              name="moviePoster" 
              value={inputForm.moviePoster}
              onChange={onInputChange} 
              required
            />
          </div>
          <div className={styles.input__wrapper}>
            <label className={styles.label}>Movie title:</label>
            <input 
              className={styles.input} 
              type="text"
              name="movieTitle" 
              value={inputForm.movieTitle}
              onChange={onInputChange} 
              required
            />
          </div>
          <div className={styles.input__wrapper}>
            <label className={styles.label}>Genre:</label>
            <input 
              className={styles.input} 
              type="text" 
              name="movieGenre" 
              value={inputForm.movieGenre}
              onChange={onInputChange}
              required
            />
          </div>
          <div className={styles.input__wrapper}>
            <label className={styles.label}>Release year:</label>
            <input 
              className={styles.input} 
              type="number" 
              name="movieReleaseYear" 
              value={inputForm.movieReleaseYear}
              onChange={onInputChange}
              required
            />
          </div>
          <div className={styles.input__wrapper}>
            <label className={styles.label}>Movie trailer:</label>
            <input 
              className={styles.input} 
              type="text" 
              name="movieTrailer" 
              value={inputForm.movieTrailer}
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <Button 
              type="submit"
              text="Add movie"
            />
          </div>
      </form>
    </div>
  );
};
