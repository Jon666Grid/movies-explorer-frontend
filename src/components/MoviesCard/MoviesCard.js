import './MoviesCard.css';
import { getTimeFromMins } from '../../utils/Utils.js'

function MoviesCard(props) {

   const hadleSaveMovie = () => {

   }

   return (
      <li className='movies-card'>
         <a className='movies-card__link' href={props.movie.trailerLink} target='blank' rel='noreferrer'>
            <img className='movies-card__image'
               src={`https://api.nomoreparties.co/${props.movie.image.url}`}
               alt={`Фильм: ${props.movie.nameRU}`}
            />
         </a>
         <div className='movies-card__container'>
            <h2 className='movies-card__title'>{props.movie.nameRU}</h2>
            <p className='movies-card__duration'>{getTimeFromMins(props.movie.duration)}</p>
            {true ? <button 
            className='movies-card__like movies-card__like_active' 
            type='button'
            onClick={hadleSaveMovie} 
            
            /> :
               <button className='movies-card__delete' type='button' />}
         </div>
      </li>
   );
}

export default MoviesCard;