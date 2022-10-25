import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
   return (
      <section className='saved-movies'>
         <SearchForm />
         <FilterCheckbox />
         {!true ? <Preloader /> : <MoviesCardList />}
      </section>
   );
}

export default SavedMovies;