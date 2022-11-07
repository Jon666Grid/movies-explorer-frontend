import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWidth from '../../hook/useWidth.js'
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, message, errorInfo, isLiked, handleSaveMovie}) {

   const location = useLocation();
   const size = useWidth();
   const [moviesCount, setMoviesCount] = useState([]);
   const savedMovies = location.pathname === '/saved-movies';
   const onAddMore = movies ? movies.length : null;
   
   useEffect(() => {
      if (savedMovies) {
         setMoviesCount(movies)
      } else if (size >= 1280) {
         setMoviesCount(movies.slice(0, 12))
      } else if (size >= 768) {
         setMoviesCount(movies.slice(0, 8))
      } else if (size <= 767) {
         setMoviesCount(movies.slice(0, 5))
      }
   }, [savedMovies, size, movies])

   const handleAddMore = () => {
      if (size >= 1280) {
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
                     isLiked={isLiked}
                     handleSaveMovie={handleSaveMovie}
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