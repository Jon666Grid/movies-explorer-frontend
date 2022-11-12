import './Movies.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filter } from '../../utils/Utils.js'
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ 
   loggedIn,
   getMovies,
   movies,
   preloader,
   errorInfo,
   moviesSave,
   handleSaveMovie,
   handleDeleteMovie }) {

   const navigate = useNavigate();
   const [searchFilter, setSearchFilter] = useState(JSON.parse(localStorage.getItem('itemSearch')) || '');
   const [checkMovies, setCheckMovies] = useState(JSON.parse(localStorage.getItem('itemChecked')) || false);
   const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('itemSave')) || []);
   localStorage.setItem('itemSave', JSON.stringify(allMovies));
   localStorage.setItem('itemChecked', JSON.stringify(checkMovies));
   localStorage.setItem('itemSearch', JSON.stringify(searchFilter));

   useEffect(() => { if (!loggedIn){ navigate('/') }; getMovies(); }, []);

   useEffect(() => {
      if (searchFilter.length > 0){
      setAllMovies(filter(movies, searchFilter, checkMovies))}
   }, [movies, searchFilter, checkMovies]);

   const message = searchFilter.length > 0 & allMovies.length === 0 || errorInfo ? true : false;

   return (
      <div className='movies'>
         <SearchForm
            searchFilter={searchFilter}
            searchMovies={setSearchFilter}
            disabled={preloader}
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
            movies={allMovies}
            moviesSave={moviesSave}
            errorInfo={errorInfo}
            message={message}
         />}
      </div>

   );
}

export default Movies;