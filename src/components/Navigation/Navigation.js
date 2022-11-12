import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useWidth from '../../hook/useWidth.js'
import './Navigation.css';

function Navigation() {

   const size = useWidth();
   const [visible, setVisible] = useState(true);

   const setActive = ({ isActive }) => isActive ? 'navigation__link_selected' : 'navigation__link';

   useEffect(() => {
      size <= 900 ? setVisible(false) : setVisible(true)
   }, [size])

   return (
      <nav className='navigation'>
         {visible ?
            <div className='navigation__sidebar'>
               <button className='navigation__close navigation__active' onClick={() => setVisible(prev => !prev)} type="button" />
               <ul className='navigation__lists'>
                  <li className='navigation__list navigation__list_hidden navigation__active'>
                     <Link to='/' className='navigation__link'>Главная</Link>
                  </li>
                  <li className='navigation__list'>
                     <NavLink to='/movies' className={setActive}>Фильмы</NavLink>
                  </li>
                  <li className='navigation__list'>
                     <NavLink to='/saved-movies' className={setActive}>Сохранённые фильмы</NavLink>
                  </li>
               </ul>
               <Link to='/profile' className='navigation__profile-link'>Аккаунт</Link>
            </div>
            : <button className='navigation__burger navigation__active' onClick={() => setVisible(prev => !prev)} type="button" />}
      </nav>
   );
}

export default Navigation;
