import './SavedMovies.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filter } from '../../utils/Utils.js'

function SavedMovies({ loggedIn, getMyMovies, moviesSave, preloader, handleDeleteMovie }) {

   const navigate = useNavigate();
   const [searchFilter, setSearchFilter] = useState(JSON.parse(localStorage.getItem('mySearch')) || '');
   const [checkMovies, setCheckMovies] = useState(JSON.parse(localStorage.getItem('myChecked')) || false);

   useEffect(() => {
      if (!loggedIn) navigate('/');
      getMyMovies();
   }, [])

   const filtered = filter(moviesSave, searchFilter, checkMovies);
   filtered.length > 0 &&
      localStorage.setItem('mySave', JSON.stringify(filtered));
   localStorage.setItem('myChecked', JSON.stringify(checkMovies));
   localStorage.setItem('mySearch', JSON.stringify(searchFilter));

   const message = searchFilter.length > 0 & filtered.length === 0 ? true : false;

   return (
      <section className='saved-movies'>
         <SearchForm
            searchFilter={searchFilter}
            searchMovies={setSearchFilter}
         />
         <FilterCheckbox
            check={setCheckMovies}
            checkMovies={checkMovies}
         />
         {preloader && <Preloader />}
         {!preloader && <MoviesCardList
            handleMyDeleteMovie={handleDeleteMovie}
            movies={filtered}
            message={message}
         />}
      </section>
   );
}

export default SavedMovies;