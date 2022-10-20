import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
   return (
      <nav className='navigation'>
         <div className='navigation__container'>
         <button className='navigation__close !navigation_active' type="button" />
            {true ? 
            <div className='navigation__sidebar'>
               <ul className='navigation__lists'>
                  <li className='navigation__list navigation__list_no-active'>
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
               : <button className='navigation__burger navigation_active' type="button" />}
         </div>
      </nav>
   );
}

export default Navigation;
