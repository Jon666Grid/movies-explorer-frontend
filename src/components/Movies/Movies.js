import './Movies.css';
import { useState, useEffect} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from '../../utils/MoviesApi.js';

function Movies() {

   const [movies, setMovies] = useState([])
   const [preloader, setPreloader] = useState(false)

   useEffect(() => {
      setPreloader(true)
      moviesApi()
         .then(res => {
            setMovies(res)
            setPreloader(false)
         })
         .catch(err => console.log(err));
   }, [])

   console.log(movies)

   return (
      <div className='movies'>
         <SearchForm />
         <FilterCheckbox />
         {preloader ? <Preloader /> : 
         <MoviesCardList 
         movies={movies}
         />}
      </div>
   );
}

export default Movies;