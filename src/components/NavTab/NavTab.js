import './NavTab.css';
import React from 'react';

function NavTab() {
   return (
      <nav className='navtab'>
         <ul className='navtab__lists'>
            <li className='navtab__list'>
               <a className='navtab__link' href='#about-project'>О проекте</a>
            </li>
            <li className='navtab__list'>
               <a className='navtab__link' href='#techs'>Технологии</a>
            </li>
            <li className='navtab__list'>
               <a className='navtab__link' href='#about-me'>Студент</a>
            </li>
         </ul>
      </nav>
   );
}

export default NavTab;