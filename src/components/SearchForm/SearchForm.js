import { useState } from 'react';
import './SearchForm.css';

function SearchForm(props) {

   const [search, setSearch] = useState('')
   const [active, setActive] = useState(false)

   const handleButton = (e) => {
      e.preventDefault();
      if (search.length > 0) {
         props.apiClick();
         props.searchMovies(search);
         setActive(false);
      }
      else {
         setActive(true);
      }
   }

   const actives = active && 'search-form_active';

   return (
      <form className='search-form'>
         <div className='search-form__content'>
            <input className='search-form__input'
               autoFocus
               autoComplete='off'
               type='text'
               placeholder='Фильм'
               onChange={(e) => setSearch(e.target.value)}
               value={search || ''}
               required
            />
            <button className='search-form__button'
               type='submit' onClick={handleButton}
            />
         </div>
         <p className={`search-form__error ${actives}`}>Нужно ввести ключевое слово</p>
      </form>
   );
}

export default SearchForm;                                 