import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import  useWidth from '../../hook/useWidth.js'
import './Navigation.css';

function Navigation(props) {

   const size =  useWidth();
   const [open, setOpen] = useState(false);
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      size <= 900 ? setVisible(false): setVisible(true)
   }, [size])

   return (
      <nav className='navigation'>
            {visible || open ? 
            <div className='navigation__sidebar'>
               <button className='navigation__close navigation__active' onClick={() => setOpen(prev => !prev)} type="button" />
               <ul className='navigation__lists'>
                  <li className='navigation__list navigation__list_hidden navigation__active'>
                     <Link to='/' className='navigation__link'>Главная</Link>
                  </li>
                  <li className='navigation__list'>
                     <NavLink to='/movies' className='navigation__link'>Фильмы</NavLink>
                  </li>
                  <li className='navigation__list'>
                     <NavLink to='/saved-movies' className='navigation__link'>Сохранённые фильмы</NavLink>
                  </li>
               </ul>
               <Link to='/profile' className='navigation__profile-link'>Аккаунт</Link>
               </div>
               :  <button className='navigation__burger navigation__active' onClick={() => setOpen(prev => !prev)} type="button" />}
      </nav>
   );
}

export default Navigation;
