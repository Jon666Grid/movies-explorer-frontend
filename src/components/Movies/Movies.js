import './Movies.css';
import { useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi.js';
import { filter } from '../../utils/Utils.js'
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

   const [movies, setMovies] = useState([]);
   const [searchFilter, setSearchFilter] = useState('');
   const [preloader, setPreloader] = useState(false);
   const [errorInfo, setErrorInfo] = useState(false);
   const [checkout, setCheckout] = useState(false);

   const handleMovies = () => {
      setPreloader(true);
      setMovies([]);
      moviesApi()
         .then(res => {
            setMovies(res);
            setPreloader(false);
            setErrorInfo(false);
         })
         .catch(err => {
            setPreloader(false);
            setErrorInfo(true);
            console.log(err)
         })
   }

   const itemMovies = () => {
      if (movies.length > 0) {
         const filteredMovies = filter(movies, searchFilter);
         localStorage.setItem('itemMovies', JSON.stringify(filteredMovies))
      }
      return JSON.parse(localStorage.getItem('itemMovies')) || [];
   }

   const message = searchFilter.length > 0 & itemMovies().length === 0 || errorInfo ? true : false;

   return (
      <div className='movies'>
         <SearchForm
            searchMovies={setSearchFilter}
            onClick={handleMovies}
         />
         <FilterCheckbox
            checkout={setCheckout} />
         {preloader && <Preloader />}
         {!preloader && <MoviesCardList
            movies={itemMovies()}
            errorInfo={errorInfo}
            message={message}
            handleSaveMovie={props.handleSaveMovie}
         />}
      </div>

   );
}

export default Movies;