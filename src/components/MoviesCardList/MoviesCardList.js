import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
   return (
      <section className='movies-cards'>
         <ul className='movies-cards__list'>
            {true ? <MoviesCard /> : <div className='movies-cards__text'>Ничего не найдено</div>}
         </ul>
         {<div className='movies-cards__button-container'>
            <button className='movies-cards__button' type='button'>Еще</button>
         </div>}
      </section>
   );
}

export default MoviesCardList;