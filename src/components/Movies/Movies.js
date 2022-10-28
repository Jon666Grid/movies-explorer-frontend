import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi.js';

function Movies() {

   const [movies, setMovies] = useState([])
   const [preloader, setPreloader] = useState(false)
   const [searchFilter, setSearchFilter] = useState('')

   const handleClick = () => {
      setPreloader(true);
      setMovies([])
      moviesApi()
         .then(res => {
            setMovies(res)
            setPreloader(false)
         })
         .catch(err => console.log(err));
   }

   console.log(movies)

   const filteredMovies = movies.filter(n => {
      const movieRu = String(n.nameRU).toLowerCase().trim();
      const movieEn = String(n.nameEN).toLowerCase().trim();
      return movieRu.includes(searchFilter.toLowerCase()) || movieEn.includes(searchFilter.toLowerCase())});

   return (
      <div className='movies'>
         <SearchForm 
         searchMovies={setSearchFilter}
         apiClick={handleClick}
         />
         <FilterCheckbox />
         {preloader && <Preloader />} 
         {!preloader && movies.length > 0 && <MoviesCardList 
         movies={filteredMovies}
         />}
      </div>
   );
}

export default Movies;