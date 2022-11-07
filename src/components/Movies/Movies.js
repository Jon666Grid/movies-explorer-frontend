import './Movies.css';
import { useState } from 'react';
import { filter } from '../../utils/Utils.js'
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ getMovies, movies, preloader, errorInfo, isLiked, handleSaveMovie }) {

   const [searchFilter, setSearchFilter] = useState(JSON.parse(localStorage.getItem('itemSearch')) || '');
   const [checkMovies, setCheckMovies] = useState(JSON.parse(localStorage.getItem('itemChecked')) || false);

   const filtered = filter(movies, searchFilter, checkMovies);
   filtered.length > 0 &&
   localStorage.setItem('itemSave', JSON.stringify(filtered));
   localStorage.setItem('itemChecked', JSON.stringify(checkMovies));
   localStorage.setItem('itemSearch', JSON.stringify(searchFilter));

   const message = searchFilter.length > 0 & filtered.length === 0 || errorInfo ? true : false;

   return (
      <div className='movies'>
         <SearchForm
            getMovies={getMovies}
            searchFilter={searchFilter}
            searchMovies={setSearchFilter}
         />
         <FilterCheckbox
            check={setCheckMovies}
            checkMovies={checkMovies}
         />
         {preloader && <Preloader
         />}
         {!preloader && <MoviesCardList
            handleSaveMovie={handleSaveMovie}
            isLiked={isLiked}
            movies={filtered}
            errorInfo={errorInfo}
            message={message}
         />}
      </div>

   );
}

export default Movies;