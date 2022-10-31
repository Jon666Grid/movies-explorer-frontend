import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi.js';

function Movies() {

   const [movies, setMovies] = useState([]);
   const [searchFilter, setSearchFilter] = useState('');
   const [preloader, setPreloader] = useState(false);
   const [errorInfo, setErrorInfo] = useState(false);
   const [checkout, setCheckout] = useState(false);

   const handleClick = () => {
      setPreloader(true);
      setMovies([]);
      moviesApi()
         .then(res => {
            setMovies(res);
            setPreloader(false);
            setErrorInfo(false);
         })
         .catch(err => {
            console.log(err)
            setPreloader(false);
            setErrorInfo(true);
         })
   }

   const filteredMovies = movies.filter(n => {
      const movieRu = String(n.nameRU).toLowerCase().trim();
      const movieEn = String(n.nameEN).toLowerCase().trim();
      return movieRu.includes(searchFilter.toLowerCase()) || movieEn.includes(searchFilter.toLowerCase());
   });

   const itemMovies = () => {
      if (movies.length > 0) {
         localStorage.setItem('itemMovies', JSON.stringify(filteredMovies))}
         return JSON.parse(localStorage.getItem('itemMovies'));
      }

   return (
      <div className='movies'>
         <SearchForm
            searchMovies={setSearchFilter}
            apiClick={handleClick}
         />
         <FilterCheckbox
            checkout={setCheckout} />
         {preloader && <Preloader />}
         {!preloader && !errorInfo && <MoviesCardList
            movies={itemMovies()}
            errorInfo={errorInfo}
         />}
      </div>

   );
}

export default Movies;