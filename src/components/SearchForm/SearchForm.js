import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ getMovies, searchMovies ,searchFilter }) {

   const location = useLocation();
   const [search, setSearch] = useState(searchFilter);
   const [active, setActive] = useState(false);

   const handleButton = (e) => {
      e.preventDefault();
      if (search.length > 0) {
         setActive(false);
         location.pathname !== '/saved-movies' && getMovies();
         searchMovies(search);
      }
      else {
         setActive(true);
      }
   }

   const activeClass = active && 'search-form_active';

   return (
      <form className='search-form'>
         <div className='search-form__content'>
            <input className='search-form__input'
               autoFocus
               autoComplete='off'
               type='text'
               placeholder='Фильм'
               onChange={(e) => setSearch(e.target.value)}
               value={search}
               required
            />
            <button className='search-form__button'
               type='submit' onClick={handleButton}
            />
         </div>
         <p className={`search-form__error ${activeClass}`}>Нужно ввести ключевое слово</p>
      </form>
   );
}

export default SearchForm;                                 