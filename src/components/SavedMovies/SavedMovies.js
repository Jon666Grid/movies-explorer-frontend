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
   const [disabled, setDisabled] = useState(false);
   const [searchFilter, setSearchFilter] = useState('');
   const [checkMovies, setCheckMovies] = useState(false);
   const [allMovies, setAllMovies] = useState([]);

   useEffect(() => {
      if (!loggedIn) navigate('/'); getMyMovies(); }, [])

   useEffect(() => {
      setDisabled(true);
      setAllMovies(filter(moviesSave, searchFilter, checkMovies))
      setDisabled(false);
   }, [moviesSave, searchFilter, checkMovies]);

   const message = searchFilter.length > 0 & allMovies.length === 0 ? true : false;

   return (
      <section className='saved-movies'>
         <SearchForm
            searchFilter={searchFilter}
            searchMovies={setSearchFilter}
            disabled={disabled}
         />
         <FilterCheckbox
            check={setCheckMovies}
            checkMovies={checkMovies}
         />
         {preloader && <Preloader />}
         {!preloader && <MoviesCardList
            handleMyDeleteMovie={handleDeleteMovie}
            movies={allMovies}
            message={message}
         />}
      </section>
   );
}

export default SavedMovies;