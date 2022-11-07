import './MoviesCard.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/Utils.js'

function MoviesCard({movie, isLiked, handleSaveMovie}) {

   const location = useLocation();
   const [like, setLike] = useState (false)
   const movies = location.pathname === '/movies';

   const toggleSaveMovie = () => {
      if (!isLiked) {
         handleSaveMovie(movie);
         setLike(true);
      }
      else if (isLiked) {
         setLike(false);
      }
   }

   return (
      <li className='movies-card'>
         <a className='movies-card__link' href={movie.trailerLink} target='blank' rel='noreferrer'>
            <img className='movies-card__image'
               src={(movies && `https://api.nomoreparties.co/${movie.image.url}`) 
                  || (movie.image)}
               alt={`Фильм: ${movie.nameRU}`}
            />
         </a>
         <div className='movies-card__container'>
            <h2 className='movies-card__title'>{movie.nameRU}</h2>
            <p className='movies-card__duration'>{getTimeFromMins(movie.duration)}</p>
            {movies ? <button 
            className={`movies-card__like ${like && 'movies-card__like_active'}`} 
            type='button'
            onClick={toggleSaveMovie} 
            /> :
               <button className='movies-card__delete' type='button' />}
         </div>
      </li>
   );
}

export default MoviesCard;