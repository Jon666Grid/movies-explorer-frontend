import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
   return (
      <section className='movies-cards'>
         {props.movies.length > 0 ?
            <ul className='movies-cards__list'>
               {props.movies.map((item) => (
                  <MoviesCard
                     key={item.id || item.movieId}
                     movie={item}
                  />))}
            </ul> :
            <div className='movies-cards__text'>Ничего не найдено</div>}

         {<div className='movies-cards__button-container'>
            <button className='movies-cards__button' type='button'>Еще</button>
         </div>}
      </section>
   );
}

export default MoviesCardList;