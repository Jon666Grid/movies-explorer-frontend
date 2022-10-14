import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
   return (
      <div className='movies'>
      <SearchForm />
      <FilterCheckbox />
      {!true ? <Preloader /> : <MoviesCardList />}
      </div>
   );
}

export default Movies;