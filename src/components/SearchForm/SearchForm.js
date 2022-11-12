import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ disabled, searchMovies, searchFilter }) {

   const [search, setSearch] = useState(searchFilter);
   const [active, setActive] = useState(false);
   const res = !/[^\s]/.test(search);

   const handleButton = (e) => {
      e.preventDefault();
      if (!res & search.length > 0) {
         setActive(false);
         searchMovies(search);
      }
      else {
         setActive(true);
      }
   }

   const activeClass = active && 'search-form_active';

   return (
      <form className='search-form' onSubmit={handleButton} noValidate>
         <div className='search-form__content'>
            <input className='search-form__input'
               autoFocus
               autoComplete='off'
               type='text'
               placeholder='Фильм'
               onChange={(e) => setSearch(e.target.value)}
               value={search}
               required
               disabled={disabled}
            />
            <button className='search-form__button'
               type='submit'
               disabled={disabled}
            />
         </div>
         <p className={`search-form__error ${activeClass}`}>Нужно ввести ключевое слово</p>
      </form>
   );
}

export default SearchForm;                                 