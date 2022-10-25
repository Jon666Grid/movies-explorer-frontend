import './SearchForm.css';

function SearchForm() {
   return (
      <form className="search-form">
         <div className="search-form__content">
            <input className="search-form__input"
               autoFocus
               autoComplete="off"
               type="text"
               placeholder="Фильм"
               required
            />
            <button className='search-form__button' type='submit' />
         </div>
      </form>
   );
}

export default SearchForm;