import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWidth from '../../hook/useWidth.js'
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

   const location = useLocation();
   const size = useWidth();
   const [moviesCount, setMoviesCount] = useState([]);
   const savedMovies = location.pathname === '/saved-movies';
   const onAddMore = props.movies ? props.movies.length : null;
   
   useEffect(() => {
      if (savedMovies) {
         setMoviesCount(props.movies)
      } else if (size >= 1280) {
         setMoviesCount(props.movies.slice(0, 12))
      } else if (size >= 768) {
         setMoviesCount(props.movies.slice(0, 8))
      } else if (size <= 767) {
         setMoviesCount(props.movies.slice(0, 5))
      }
   }, [savedMovies, size, props.movies])

   const handleAddMore = () => {
      if (size >= 1280) {
         setMoviesCount(props.movies.slice(0, moviesCount.length + 3));
      } else {
         setMoviesCount(props.movies.slice(0, moviesCount.length + 2));
      }
   }

   return (
      <section className='movies-cards'>
         {!props.message ?
            <ul className='movies-cards__list'>
               {moviesCount.map((item) => (
                  <MoviesCard
                     movie={item}
                     key={item.movieId || item.id}
                     handleSaveMovie={props.handleSaveMovie}
                  />))}
            </ul> :
            <div className='movies-cards__text'>
               {props.errorInfo ?
                  `Во время запроса произошла ошибка. 
                  Возможно, проблема с соединением или сервер недоступен. 
                  Подождите немного и попробуйте ещё раз`
                  :
                  `Ничего не найдено`}
            </div>}
         {onAddMore !== moviesCount.length && <div className='movies-cards__button-container'>
            <button className='movies-cards__button'
               type='button'
               onClick={handleAddMore}
            >Еще</button>
         </div>}
      </section>
   );
}

export default MoviesCardList;