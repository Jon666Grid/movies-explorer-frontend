import './MoviesCard.css';
import film from '../../images/film.jpg';

function MoviesCard() {
   return (
      <>
      <li className='movies-card'>
         <a href='/' target='blank' rel='noreferrer'>
            <img className='movies-card__image' src={film} alt='кадр фильма' />
         </a>
         <div className='movies-card__container'>
         <h2 className='movies-card__title'>33 слова о дизайне</h2>
         <p className='movies-card__duration'>1ч 47м</p>
         <button className='movies-card__like movies-card__like_active' type='button' />
         </div>
      </li>
      <li className='movies-card'>
         <a className='movies-card__link' href='/' target='blank' rel='noreferrer'>
            <img className='movies-card__image' src={film} alt='кадр фильма' />
         </a>
         <div className='movies-card__container'>
         <h2 className='movies-card__title'>33 слова о дизайне</h2>
         <p className='movies-card__duration'>1ч 47м</p>
         <button className='movies-card__like' type='button' />
         </div>
      </li>
      <li className='movies-card'>
         <a className='movies-card__link' href='/' target='blank' rel='noreferrer'>
            <img className='movies-card__image' src={film} alt='кадр фильма' />
         </a>
         <div className='movies-card__container'>
         <h2 className='movies-card__title'>33 слова о дизайне</h2>
         <p className='movies-card__duration'>1ч 47м</p>
         <button className='movies-card__like' type='button' />
         </div>
      </li>
      
</>
   );
}

export default MoviesCard;