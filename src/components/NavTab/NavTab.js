import './NavTab.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavTab() {
   return (
      <nav className='navtab'>
         <ul className='navtab__lists'>
            <li className='navtab__list'>
               <Link className='navtab__link' to='#about-project'>О проекте</Link>
            </li>
            <li className='navtab__list'>
               <Link className='navtab__link' to='#techs'>Технологии</Link>
            </li>
            <li className='navtab__list'>
               <Link className='navtab__link'to='#about-me'>Студент</Link>
            </li>
         </ul>
      </nav>
   );
}

export default NavTab;