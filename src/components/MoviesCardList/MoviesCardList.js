import React, { useState, useEffect, useCallback } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

   const [size, setSize] = useState([])
   const [moviesCount, setMoviesCount] = useState([]);
   const onAddMore = props.movies ? props.movies.length : 0;
   const getSize = useCallback(() => window.innerWidth, []);

   useEffect(() => {
      const hanleResize = () => {
         setSize(getSize)
      };
      setTimeout(() => window.addEventListener('resize', hanleResize), 1000);
      return () => {
         window.removeEventListener('resize', hanleResize)
      };
   }, [ getSize])

   useEffect(() => {
      if (size >= 1280) {
         setMoviesCount(props.movies.slice(0, 12))
      } else if (size >= 768) {
         setMoviesCount(props.movies.slice(0, 8))
      } else if (size <= 767) {
         setMoviesCount(props.movies.slice(0, 5))
      }
   }, [size, props.movies])

   const handleAddMore = () => {
      if (size >= 1280) {
         setMoviesCount(props.movies.slice(0, moviesCount.length + 3));
      } else {
         setMoviesCount(props.movies.slice(0, moviesCount.length + 2));
      }
   }

   return (
      <section className='movies-cards'>
         {props.movies.length > 0 ?
            <ul className='movies-cards__list'>
               {moviesCount.map((item) => (
                  <MoviesCard
                     key={item.id || item.movieId}
                     movie={item}
                  />))}
            </ul> :
            <div className='movies-cards__text'>
               {props.errorInfo ?
                  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                  : 'Ничего не найдено'}</div>}
         {onAddMore !== moviesCount.length && <div className='movies-cards__button-container'>
            <button className='movies-cards__button'
               type='button'
               onClick={handleAddMore}
            >Еще{size}</button>
         </div>}
      </section>
   );
}

export default MoviesCardList;