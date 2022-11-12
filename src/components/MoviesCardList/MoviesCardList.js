import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
   LARGE_SCREEN,
   MIDDLE_SCREEN,
   SMALL_SCREEN,
   LARGE_SCREEN_MOVIES,
   SMALL_SCREEN_MOVIES,
   MIDDLE_SCREEN_MOVIES
} from '../../utils/constants.js';
import useWidth from '../../hook/useWidth.js'
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ 
   movies,
   message,
   errorInfo,
   moviesSave,
   handleSaveMovie,
   handleDeleteMovie,
   handleMyDeleteMovie }) {

   const location = useLocation();
   const size = useWidth();
   const [moviesCount, setMoviesCount] = useState([]);
   const savedMovies = location.pathname === '/saved-movies';
   const onAddMore = movies ? movies.length : null;

   useEffect(() => {
      if (savedMovies) {
         setMoviesCount(movies)
      } else if (size >= LARGE_SCREEN) {
         setMoviesCount(movies.slice(0, LARGE_SCREEN_MOVIES))
      } else if (size >= MIDDLE_SCREEN) {
         setMoviesCount(movies.slice(0, SMALL_SCREEN_MOVIES))
      } else if (size <= SMALL_SCREEN) {
         setMoviesCount(movies.slice(0, MIDDLE_SCREEN_MOVIES))
      }
   }, [savedMovies, size, movies])

   const handleAddMore = () => {
      if (size >= LARGE_SCREEN) {
         setMoviesCount(movies.slice(0, moviesCount.length + 3));
      } else {
         setMoviesCount(movies.slice(0, moviesCount.length + 2));
      }
   }

   return (
      <section className='movies-cards'>
         {!message ?
            <ul className='movies-cards__list'>
               {moviesCount.map((item) => (
                  <MoviesCard
                     movie={item}
                     key={item.movieId || item.id}
                     moviesSave={moviesSave}
                     handleSaveMovie={handleSaveMovie}
                     handleDeleteMovie={handleDeleteMovie}
                     handleMyDeleteMovie={handleMyDeleteMovie}
                  />))}
            </ul> :
            <div className='movies-cards__text'>
               {errorInfo ?
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