import './SavedMovies.css';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filter } from '../../utils/Utils.js'
import * as mainApi from '../../utils/MainApi.js';

function SavedMovies(props) {

   const [movies, setMovies] = useState([]);
   const [searchFilter, setSearchFilter] = useState('');
   const [preloader, setPreloader] = useState(false);

   useEffect(() => {
      setPreloader(true);
      const jwt = localStorage.getItem('jwt');
      mainApi.getMovies(jwt)
         .then((data) => {
            setMovies(data)
            setPreloader(false);
         })
         .catch(err => {
            console.log(err)
            setPreloader(false);
         })
   }, [])

   const itemSavedMovies = () => filter(movies, searchFilter);

   const message = searchFilter.length > 0 & itemSavedMovies().length === 0 ? true : false;

   return (
      <section className='saved-movies'>
         <SearchForm 
         searchMovies={setSearchFilter}
         onClick={itemSavedMovies}/>
         <FilterCheckbox />
         {preloader && <Preloader /> } 
         {!preloader && <MoviesCardList
         movies={itemSavedMovies()}
         message={message}
         />}
      </section>
   );
}

export default SavedMovies;