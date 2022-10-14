import './SearchForm.css';

function SearchForm() {
   return (
      <section className="search-form">
         <div className="search-form__content">
            <input className="search-form__input"
               autoFocus
               autoComplete="off"
               type="text"
               placeholder="Фильм"
            />
            <button className='search-form__button'type="button" />
         </div>
         </section>
         );
}

         export default SearchForm;