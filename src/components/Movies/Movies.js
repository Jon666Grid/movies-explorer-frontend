import './Movies.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filter } from '../../utils/Utils.js'
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({loggedIn, getMovies, movies, preloader, errorInfo, moviesSave, handleSaveMovie, handleDeleteMovie}) {

   const navigate = useNavigate();
   const [searchFilter, setSearchFilter] = useState(JSON.parse(localStorage.getItem('itemSearch')) || '');
   const [checkMovies, setCheckMovies] = useState(JSON.parse(localStorage.getItem('itemChecked')) || false);

   useEffect(() => {
      if(!loggedIn) navigate('/'); 
      if(searchFilter.length > 0) {
         getMovies();
      }
   }, [])

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
            handleDeleteMovie={handleDeleteMovie}
            movies={filtered}
            moviesSave={moviesSave}
            errorInfo={errorInfo}
            message={message}
         />}
      </div>

   );
}

export default Movies;