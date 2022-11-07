import './MoviesCard.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/Utils.js'

function MoviesCard(props) {





   const location = useLocation();
   const movies = location.pathname === '/movies';

   const toggleSaveMovie = () => {
      
      if (true) {
         props.handleSaveMovie(props.movie);

      }
      else  {
       
      }
   }

   return (
      <li className='movies-card'>
         <a className='movies-card__link' href={props.movie.trailerLink} target='blank' rel='noreferrer'>
            <img className='movies-card__image'
               src={(movies && `https://api.nomoreparties.co/${props.movie.image.url}`) 
                  || (props.movie.image)}
               alt={`Фильм: ${props.movie.nameRU}`}
            />
         </a>
         <div className='movies-card__container'>
            <h2 className='movies-card__title'>{props.movie.nameRU}</h2>
            <p className='movies-card__duration'>{getTimeFromMins(props.movie.duration)}</p>
            {movies ? <button 
            className={`movies-card__like ${ 'movies-card__like_active'}`} 
            type='button'
            onClick={toggleSaveMovie} 
            /> :
               <button className='movies-card__delete' type='button' />}
         </div>
      </li>
   );
}

export default MoviesCard;