import {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

   const [open, setOpen] = useState(true);

   return (
      <nav className='navigation'>
            {open ? 
            <div className='navigation__sidebar'>
               <button className='navigation__close navigation__active' onClick={() => setOpen(false)} type="button" />
               <ul className='navigation__lists'>
                  <li className='navigation__list navigation__list_hidden navigation__active'>
                     <Link to='/' className='navigation__link'>Главная</Link>
                  </li>
                  <li className='navigation__list'>
                     <NavLink to='/movies' className='navigation__link' activeClassName='navigation__link_active'>Фильмы</NavLink>
                  </li>
                  <li className='navigation__list'>
                     <NavLink to='/saved-movies' className='navigation__link' activeClassName='navigation__link_active'>Сохранённые фильмы</NavLink>
                  </li>
               </ul>
               <Link to='/profile' className='navigation__profile-link'>Аккаунт</Link>
               </div>
               : <button className='navigation__burger navigation__active' onClick={() => setOpen(true)} type="button" />}
      </nav>
   );
}

export default Navigation;
