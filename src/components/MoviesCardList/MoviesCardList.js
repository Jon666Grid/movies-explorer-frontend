import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

   const message = props.errorInfo ? 
   'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
   : 'Ничего не найдено';

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
            <div className='movies-cards__text'>{message}</div>}

         {<div className='movies-cards__button-container'>
            <button className='movies-cards__button' type='button'>Еще</button>
         </div>}
      </section>
   );
}

export default MoviesCardList;